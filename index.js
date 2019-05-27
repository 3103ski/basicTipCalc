const DOMstrings = {
	inputDue: document.querySelector('.bill__total'),
	serviceQuality: document.querySelector('.quality__options'),
	headCount: document.querySelector('.head__count'),
	summary: document.querySelector('.summary__cont'),
	summaryTxt: document.querySelectorAll('.summary'),
	calcBtn: document.querySelector('.calc__btn'),
	summDue: document.querySelector('.summary_due'),
	summTip: document.querySelector('.summary_tip'),
	summTotal: document.querySelector('.summary_total'),
	summEach: document.querySelector('.summary_each')
}

// create input state object for info
let data = {
	due: 0,
	quality: 0,
	tip: 0,
	total: 0,
	numPeople: 0,
	eachPay: 0
}

// ///////////////////
// collect info
// ///////////////////

const collectData = () => {
	data.due = parseInt(DOMstrings.inputDue.value)
	data.quality = parseInt(DOMstrings.serviceQuality.value)
	data.numPeople = parseInt(DOMstrings.headCount.value)
}

// ///////////////////
// calculate numbers
// ///////////////////

const calcInput = (due, quality, headCount) => {
	let tipPerc
	let tip
	let total
	let portion

	if (quality === 0) {
		tipPerc = 0.05
	}
	if (quality === 1) {
		tipPerc = 0.1
	}
	if (quality === 2) {
		tipPerc = 0.15
	}
	if (quality === 3) {
		tipPerc = 0.2
	}
	if (quality === 4) {
		tipPerc = 0.25
	}
	tip = due * tipPerc
	total = due + tip
	portion = total / headCount
	data.eachPay = portion
	data.tip = tip
	data.total = total
}

// ///////////////////
// Render Summary
// ///////////////////

const renderSummary = () => {
	DOMstrings.summDue.innerHTML = data.due.toFixed(2)
	DOMstrings.summTip.innerHTML = data.tip.toFixed(2)
	DOMstrings.summTotal.innerHTML = data.total.toFixed(2)
	DOMstrings.summEach.innerHTML = data.eachPay.toFixed(2)

	DOMstrings.summary.classList.remove('summary_hide')
	DOMstrings.summaryTxt.forEach(e => {
		e.style.opacity = '1'
	})
	DOMstrings.summary.style.marginTop = '0px'
	console.log(`summary rendered`)
}

DOMstrings.calcBtn.addEventListener('click', () => {
	collectData()
	console.log(data)
	let headCount = data.numPeople
	let due = data.due

	if (isNaN(due) && data.numPeople > 0) {
		alert('Please enter the amount of your bill')
	}
	if (isNaN(headCount) && data.due > 0) {
		alert(`Please enter the amount of people`)
	}
	if (isNaN(due) && isNaN(headCount)) {
		alert(
			`Please let us know how many people are in your party and how much the bill is.`
		)
	}
	if (due > 0 && headCount > 0) {
		calcInput(data.due, data.quality, data.numPeople)
		renderSummary()
	}
})
