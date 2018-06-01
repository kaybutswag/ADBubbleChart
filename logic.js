//data courtesy of https://recurringdevelopments.com/#_
var dataset=[
	{"gag":"Tobias mislead about his sexuality",
	 "s1":14,
	 "s2":14,
	 "s3":12,
	 "s4":6,
	 "url":"../BubbleImages/mislead.jpeg"
	},{
	 "gag":"Struggle with hammer",
	 "s1":4,
	 "s2":3,
	 "s3":0,
	 "s4":0,
	 "url":"../BubbleImages/hammer.jpeg"
	},{
	"gag":"G.O.B. fails a magic trip",
	 "s1":8,
	 "s2":8,
	 "s3":5,
	 "s4":1,
	 "url":"../BubbleImages/magic.gif"
	},{
	"gag":"Nevernude",
	 "s1":6,
	 "s2":6,
	 "s3":1,
	 "s4":2,
	 "url":"../BubbleImages/nevernude.jpg"
	},{
	"gag":"Lucille is a racist",
	 "s1":8,
	 "s2":2,
	 "s3":1,
	 "s4":3,
	 "url":"../BubbleImages/lucille.jpeg"
	},{
	"gag":"Steve Holt!",
	 "s1":2,
	 "s2":3,
	 "s3":4,
	 "s4":2,
	 "url":"../BubbleImages/steveholt.jpeg"
	},{
	"gag":"Blue Man Group",
	 "s1":0,
	 "s2":12,
	 "s3":2,
	 "s4":4,
	 "url":"../BubbleImages/bluemen.jpeg"
	},{
	"gag":"Nightstick Clubbing",
	 "s1":0,
	 "s2":7,
	 "s3":2,
	 "s4":1
	},{
	"gag":"Forget Me Now",
	 "s1":0,
	 "s2":0,
	 "s3":3,
	 "s4":4,
	 "url":"../BubbleImages/forgetmenow.jpeg"
	},{
	"gag":"Bob Loblaw",
	 "s1":0,
	 "s2":0,
	 "s3":2,
	 "s4":2,
	 "url":"../BubbleImages/bobloblaw.jpeg"
	},{
	"gag":"C'mon!",
	 "s1":0,
	 "s2":4,
	 "s3":6,
	 "s4":2,
	 "url":"../BubbleImages/gobcmon.jpeg"

	},{
	"gag":"Doctor is too literal",
	 "s1":1,
	 "s2":3,
	 "s3":0,
	 "s4":2,
	 "url":"../BubbleImages/doctor.jpeg"
	},{
	"gag":"Banana Stand",
	 "s1":8,
	 "s2":6,
	 "s3":2,
	 "s4":1,
	 "url":"../BubbleImages/bananastand.jpeg"
	}
	];

//sets backdrop
var width=1200,height=700;

var svg =d3.select("#chart")
	.append("svg")
	.attr("height", height)
	.attr("width", width)
	.append("g")
	.attr("transform","translate(0,0)");


var raduisScale=d3.scaleSqrt().domain([0,464]).range([12,75])

//goes to middle
var simulation=d3.forceSimulation ()
	.force("x",d3.forceX(width/2).strength(0.05))
	.force("y",d3.forceY(height/2).strength(0.05))
	.force("collide",d3.forceCollide(function(d){
		return raduisScale(d.s1+d.s2+d.s3+d.s4)*3;
	}));

function wrap(d) {
    var text = d3.select(this),
      width = d.r * 2,
      x = d.x,
      y = d.y,
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1,
      tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + "em").text(word);
      }
    }
}

//builds circles
	function ready(data){
		var circles=svg.selectAll(".jokes")
			.data(data)
			.enter().append("circle")
			.attr("class","jokes")
			.attr("r",function(d){
				return raduisScale(d.s1+d.s2+d.s3+d.s4)*3;
			})
			.attr("fill","lightblue");
		
		var texts = svg.selectAll()
		    .data(data)
		    .enter()
		    .append('text')
		    .text(d => d.gag)
		    .attr('color', 'black')
		    .attr('text-anchor','middle')
		    .attr('font-size', 12)
		    .attr("line-height","14px")
		    .attr("word-break","break-all")
		    .attr("height","30px")
		    .attr('width',function(d){
		    	return raduisScale(d.s1+d.s2+d.s3+d.s4)*3;
		    });


		simulation.nodes(data)
			.on('tick',ticked);

		function ticked(){
			circles
				.attr("cx", function(d){
					return d.x
				})
				.attr("cy", function(d){
					return d.y
				})
			texts.attr('x', (d) => {
	            return d.x
		        })
		        .attr('y', (d) => {
		            return d.y
		        });
				}
	}



ready(dataset);
