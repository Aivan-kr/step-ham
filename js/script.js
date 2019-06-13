$('#tabsContent li:not(:first)').hide();
$('#tabs').click((e) => {
	$(".tabs-title.active").removeClass("active");
	$(e.target).addClass("active");
	$('#tabsContent li').hide();
	$(`#tabsContent li[data-content=${e.target.dataset.content}]`).show()
})


let slideWidth = $(".person").first().width();

$('#carTabs').on("click", (e) => {
	switch(e.target){
		case $("#fBtn")[0]:
		case $("#fBtn").children()[0]:
			if($(".img-btn").last().hasClass("active")){
				$(".img-btn.active").removeClass("active");
				$(".img-btn").first().addClass("active");
			}else{
				let nImg = $(".img-btn.active").next();
				$(".img-btn.active").removeClass("active");
				nImg.addClass("active");
			}
			break;
		case $("#bBtn")[0]:
		case $("#bBtn").children()[0]:
			if($(".img-btn").first().hasClass("active")){
				$(".img-btn.active").removeClass("active");
				$(".img-btn").last().addClass("active");
			}else{
				let pImg = $(".img-btn.active").prev();
				$(".img-btn.active").removeClass("active");
				pImg.addClass("active");
			}
			break;
		default:
			if($(e.target).is("img")){
				$(".img-btn.active").removeClass("active");
				$(e.target).parent().addClass("active");
			}
			break;
	}
	$(".people").animate({
		left: -$(".img-btn.active").data("index")*slideWidth
	}, 1000);

})

setInterval(() => $("#fBtn").trigger("click"), 6000);

$('a[href*="#"]').on('click', function(e) {

	$(".nav-link.active").removeClass("active");
	$(this).parent().addClass("active");

	let scroll = $(this).attr('href') == "#" ? 0 : $($(this).attr('href')).offset().top-119;
  	$('html, body').animate({
      		scrollTop: scroll,
    	},
    	500,
    	'linear'
  	)
})

$(window).scroll(function() {
	if($(this).scrollTop() < $("#home").height()){
		$(".nav-link.active").removeClass("active");
		$(".nav-link").first().addClass("active");
	}else{
		let elem = document.elementFromPoint(0, 120);
		if(!$(elem).is("section"))
			elem = $(elem).parents("section")[0];
		if($(".nav-link.active a").attr("href") != `#${elem.id}`){
			$(".nav-link.active").removeClass("active");
			$(`.nav-link a[href="#${elem.id}"]`).parent().addClass("active");
		}
    }
});

function imgLoad(category, n, dest){
	let img = new Image();
	img.onload = () => {
		let container = document.createElement('div');
		$(container).addClass('work');
		container.innerHTML = `
			<img src="img/${category}/${category}${n}.jpg" alt="picture" class="work-img">
			<div class="work-card">
				<a href="#"><i class="fas fa-link"></i></a>
				<a href="#"><i class="fas fa-search"></i></a>
				<h5 class="green">Creative design</h5>
				<p>${category.split('-').join(" ")}</p>
			</div>`;
		$(dest).append(container);
	}
	img.src = `./img/${category}/${category}${n}.jpg`
}

let imgIndex = 1;

function imgPack(category, dest){
	let dir = category.data("title");
	if(dir == "all"){
		let categories = [];
		for(let i = 0; i < category.siblings().length; i++){
			categories.push($(category.siblings()[i]).data("title"));
		}
		for(let i = 0; i < 12; i++){
			imgLoad(categories[i % categories.length], imgIndex, ".works");
			if((i + 1) % categories.length == 0)
				imgIndex++;
		}
	}else{
		for(let i = 0; i < 12; i++){
			imgLoad(dir, imgIndex, dest);
			imgIndex++;
		}
	}
}

imgPack($('.category.active'), ".works");

$('#categories').on("click", "li", function(e){
	$(".category.active").removeClass("active");
	$(this).addClass("active");
	$(".works").html("");
	imgIndex = 1;
	$('#loadBtn').show();
	imgPack($(this), ".works");
})


$('#loadBtn').click(function(){
	imgPack($('.category.active'), ".works");
 	$(this).hide();
})

let $grid = $('.gallery-container').imagesLoaded( function() {
  // init Masonry after all images have loaded
  $grid.masonry({
    // options...
  itemSelector: '.gallery-item',
  columnWidth: 55,
  gutter: 10

  });
});