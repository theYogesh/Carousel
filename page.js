(function () {
	"use strict"
	
	var $leftbtn , $rightBtn , $liList , $ul , $createBtn;
	var shiftMargin=0 , maxWidth , maxHeight , $slider,animateTime;
	var flag;

	animateTime=1000; //1 sec animation time
	$liList = $('#divLiList');
	$leftbtn = $('#divLeftBtn');
	$rightBtn = $('#divRightBtn');
	$ul=$('#divLiList ul');
	$createBtn=$('#createBtn');
	$slider=$('#divSlider');

	maxHeight=parseInt($slider.css('height'));
	maxWidth=parseInt($slider.css('width'));
	
	shiftMargin = maxWidth;
	
	flag=true; //flag for preventing mutiple clicks
	
	$leftbtn.click(function (e) {
		
		var lMargin = parseInt($liList.css("margin-left"));
		if( flag===true && lMargin < 0)
		{	
			flag=false;
			if( (lMargin+shiftMargin) > 0)
			{
				$liList.animate({ 'margin-left' : '0px'} , animateTime, function(){flag=true;});
			}
			else
			{
				var newMargin=(lMargin + shiftMargin) + 'px';
				$liList.animate({ 'margin-left' : newMargin} , animateTime, function(){flag=true;});
			}
		}
	});

	$rightBtn.click(function (e) {
		var rLimit = (parseInt($liList.css('width')) - maxWidth) * -1;
		var rMargin = parseInt($liList.css("margin-left"));
		if(flag===true && (rMargin > rLimit))
		{
			flag=false;
			if((rMargin - shiftMargin) > rLimit)
			{
				var newMargin=(rMargin - shiftMargin) + 'px';
				$liList.animate({ 'margin-left' : newMargin} , animateTime, function(){flag=true;});
			}
			else
			{
				var newMargin=rLimit+'px';
				$liList.animate({ 'margin-left' : newMargin} , animateTime, function(){flag=true;});
			}
		}
	});
	
	$createBtn.click(function ()
	{
		debugger;
		refreshList();
		var liSide,sideMargin,eTotal,eSlide,liListWidth,marginTop,$li;
		
		
		eTotal=parseInt($('#inTotalElements').val());
		eSlide=parseInt($('#inSingleSlideElements').val());
		
		if(eTotal<eSlide)
		{
			alert("Total elements can't be less than elements on Slide");		
		}
		else
		{
			if((maxWidth/eSlide)>maxHeight)
				liSide=maxHeight;
			else
				liSide=maxWidth/eSlide;

			sideMargin = ((maxWidth-eSlide*liSide)/eSlide)/2;

			if(sideMargin <= 0)
			{
				var totalMargin, marginFor1;
				totalMargin= (5+5)*eSlide;
				marginFor1= totalMargin/eSlide;
				sideMargin= 5;
				liSide -= marginFor1;
			}

			marginTop=(maxHeight/2)-(liSide/2);

			if(marginTop <= 0)
			{
				marginTop=20;
				liSide -=40;
				sideMargin+=20;
			}
			marginTop-=16; //removing 16px top-padding....which I don't know why it is there

			
			shiftMargin=liSide+2*sideMargin;  //side margin for single shift

			liListWidth=(eTotal*liSide)+(eTotal*2*sideMargin);
			$liList.css('width',liListWidth+'px');

			for(var i=1 ; i<=eTotal ; i++)
			{
				$ul.append('<li>'+i+'</li>');
			}

			$li=$('#ulElements li')

			$li.css('width',liSide+'px');
			$li.css('height',liSide+'px');

			$li.css('margin-right',sideMargin+'px');
			$li.css('margin-left',sideMargin+'px')
			$li.css('margin-top', marginTop+'px');
			$li.css('line-height', liSide +'px')

			$liList.css('margin-left',0+'px')
		}
		
	});
	
	function refreshList(){
		$('#ulElements li').remove();
		$liList.css('width', maxWidth+'px');
	}
	
	$leftbtn.on( "mouseenter", function() 
	{
		$leftbtn.fadeTo(200, 0.7);
	})
	.on( "mouseleave", function()
	{
		$leftbtn.fadeTo(200, 1.0);
  	});
	
	$rightBtn.on( "mouseenter", function() 
	{
		$rightBtn.fadeTo(200, 0.7);
	})
	.on( "mouseleave", function()
	{
		$rightBtn.fadeTo(200, 1.0);
  	});
	
	$createBtn.on( "mouseenter", function() 
	{
		$createBtn.fadeTo(200, 0.7);
	})
	.on( "mouseleave", function()
	{
		$createBtn.fadeTo(200, 1.0);
  	});
}());