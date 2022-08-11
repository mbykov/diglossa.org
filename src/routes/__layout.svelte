<script>
 import "../app.css";

	function move(element) {

		return {
			destroy() {
			}
		}
	}

	function resize(element) {
		const right = document.createElement('div')
		right.direction = 'east'
		right.classList.add('grabber')
		right.classList.add('right')

		const left = document.createElement('div')
		left.direction = 'west'
		left.classList.add('grabber')
		left.classList.add('left')

		const top = document.createElement('div')
		top.direction = 'north'
		top.classList.add('grabber')
		top.classList.add('top')

    const bottom = document.createElement('div')
		bottom.direction = 'south'
		bottom.classList.add('grabber')
		bottom.classList.add('bottom')

		const topLeft = document.createElement('div')
		topLeft.direction = 'northwest'
		topLeft.classList.add('grabber')
		topLeft.classList.add('top-left')

		const topRight = document.createElement('div')
		topRight.direction = 'northeast'
		topRight.classList.add('grabber')
		topRight.classList.add('top-right')

		const bottomLeft = document.createElement('div')
		bottomLeft.direction = 'southwest'
		bottomLeft.classList.add('grabber')
		bottomLeft.classList.add('bottom-left')

		const bottomRight = document.createElement('div')
		bottomRight.direction = 'southeast'
		bottomRight.classList.add('grabber')
		bottomRight.classList.add('bottom-right')

    const grabbers = [right, left, top, bottom, topLeft, topRight, bottomLeft, bottomRight]

		let active = null, initialRect = null, initialPos = null

		grabbers.forEach(grabber => {
			element.appendChild(grabber)
			grabber.addEventListener('mousedown', onMousedown)
		})

		function onMousedown(event) {
			active = event.target
			const rect = element.getBoundingClientRect()
			const parent = element.parentElement.getBoundingClientRect()

			console.log({rect, parent})

			initialRect = {
				width: rect.width,
				height: rect.height,
				left: rect.left - parent.left,
				right: parent.right - rect.right,
				top: rect.top - parent.top,
				bottom: parent.bottom - rect.bottom
			}
			initialPos = { x: event.pageX, y: event.pageY }
			active.classList.add('selected')
		}

    function onMouseup(event) {
			if (!active) return

			active.classList.remove('selected')
			active = null
			initialRect = null
			initialPos = null
		}

		function onMove(event) {
			if (!active) return

			const direction = active.direction
			let delta

			if (direction.match('east')) {
				delta = event.pageX - initialPos.x
				element.style.width = `${initialRect.width + delta}px`
			}

			if (direction.match('west')) {
				delta = initialPos.x - event.pageX
				element.style.left = `${initialRect.left - delta}px`
				element.style.width = `${initialRect.width + delta}px`
			}

      if (direction.match('north')) {
				delta = initialPos.y - event.pageY
				element.style.top = `${initialRect.top - delta}px`
				element.style.height = `${initialRect.height + delta}px`
			}

			if (direction.match('south')) {
				delta = event.pageY - initialPos.y
				element.style.height = `${initialRect.height + delta}px`
			}
		}

		window.addEventListener('mousemove', onMove)
		window.addEventListener('mouseup', onMouseup)

		return {
			destroy() {
				window.removeEventListener('mousemove', onMove)
				window.removeEventListener('mousemove', onMousedown)

				grabbers.forEach(grabber => {
					element.removeChild(grabber)
				})
			}
		}
	}

	let grabber = false

</script>


<!-- <main1 class:hide-grabber={!grabber}> -->
	<div class="box" use:move use:resize class:hide-grabber={!grabber}>
		Box
	</div>
<!-- </main1> -->


<div class="flex flex-col min-h-screen max-h-screen overflow-hidden bg-[#F7F6EE]">
    <main class="flex flex-grow overflow-hidden">

        <div class="w-1/6 p-4 bg-gray-200">
            <p>anthrax</p>
            <!-- <NavBar /> -->
            <div class="mt-24 m-4">
                <p><a href="/">home</a></p>
            </div>
        </div>

        <div class="flex flex-col w-2/6 p-4 overflow-y-auto">
            <p>main</p>
            <slot />
        </div>

        <div class="w-2/6 p-4">
        </div>

        <div class="w-1/6 p-4">
            <p>right</p>
            <ul class="mt-8">
                <li class=""><a href="/code">code</a></li>
                <li class=""><a href="/license">license</a></li>
                <li><a href=""></a></li>
                <li>
                    ΣΩ. Εἰ μὲν τῶν ἐν Κυρήνῃ μᾶλλον ἐκηδόμην, ὦ Θεόδωρε, τὰ ἐκεῖ ἄν σε καὶ περὶ ἐκείνων ἀνηρώτων, εἴ τινες αὐτόθι περὶ γεωμετρίαν ἤ τινα ἄλλην φιλοσοφίαν εἰσὶ τῶν νέων ἐπιμέλειαν ποιούμενοι· νῦν δὲ ἧττον γὰρ ἐκείνους ἢ τούσδε φιλῶ, καὶ μᾶλλον ἐπιθυμῶ εἰδέναι τίνες ἡμῖν τῶν νέων ἐπίδοξοι γενέσθαι ἐπιεικεῖς. ταῦτα δὴ αὐτός τε σκοπῶ καθ' ὅσον δύναμαι, καὶ τοὺς ἄλλους ἐρωτῶ οἷς ἂν ὁρῶ τοὺς νέους ἐθέλοντας συγγίγνεσθαι. σοὶ δὴ οὐκ ὀλίγιστοι πλησιάζουσι, e  καὶ δικαίως· ἄξιος γὰρ τά τε ἄλλα καὶ γεωμετρίας ἕνεκα. εἰ δὴ οὖν τινι ἐνέτυχες ἀξίῳ λόγου, ἡδέως ἂν πυθοίμην.
                </li>
            </ul>
        </div>

    </main>
</div>


<style>
	.box {
		left: 800px;
		top: 100px;
		height: 600px;
		width: 500px;
		/* background: #e5e5e5; */
		background: papayawhip;
		display: flex;
		justify-content: center;
		align-items: center;
		/* position: relative; */
		position: absolute;
		user-select: none;
    border: 1px solid;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}

	:global(.grabber) {
		position: absolute;
		box-sizing: border-box;
	}

	:global(.grabber.right) {
		width: 10px;
		height: 100%;
		background: red;
		right: -5px;
		cursor: col-resize;
	}

  	:global(.grabber.left) {
		width: 10px;
		height: 100%;
		background: blue;
		left: -5px;
		cursor: col-resize;
	}

	:global(.grabber.top) {
		height: 10px;
		width: 100%;
		background: green;
		top: -5px;
		cursor: row-resize;
	}

	:global(.grabber.bottom) {
		height: 10px;
		width: 100%;
		background: orange;
		bottom: -5px;
		cursor: row-resize;
	}

  	:global(.grabber.top-left) {
		height: 20px;
		width: 20px;
		background: orange;
		top: -10px;
		left: -10px;
		cursor: nw-resize;
		border-radius: 100%;
	}

	:global(.grabber.top-right) {
		height: 20px;
		width: 20px;
		background: orange;
		top: -10px;
		right: -10px;
		cursor: ne-resize;
		border-radius: 100%;
	}

	:global(.grabber.bottom-left) {
		height: 20px;
		width: 20px;
		background: green;
		bottom: -10px;
		left: -10px;
		cursor: sw-resize;
		border-radius: 100%;
	}

  	:global(.grabber.bottom-right) {
		height: 20px;
		width: 20px;
		background: green;
		bottom: -10px;
		right: -10px;
		cursor: se-resize;
		border-radius: 100%;
	}

	:global(.hide-grabber .grabber) {
		background: transparent !important;
		border: none !important;
	}

	:global(.grabber.selected) {
		border: solid 1px black;
	}

	header {
		text-align: center;
	}

	main1 {
		flex: 2;
		display: block;
		position: absolute;
	}

  :global(body) {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

</style>
