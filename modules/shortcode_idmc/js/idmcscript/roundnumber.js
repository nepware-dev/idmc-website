function roundChartNumberIdmc(value){
	if (typeof(value) === 'undefined') return '';
	
	value = parseInt(value);
	if (value <= 100) return value;
	if (value > 100 && value <= 1000) return Math.round(value/10)*10;
	if (value > 1000 && value <= 10000) return Math.round(value/100)*100;
	if (value > 10000) return Math.round(value/1000)*1000;
}