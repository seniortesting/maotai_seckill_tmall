
//定时器
const timer = null;

//检测状态
function checkElementState(path, callback) {
	const ele = document.querySelector(path);
	if (ele) {
		callback && callback();
	} else {
		console.log('异步加载元素中....' + path);
		setTimeout(function () { checkElementState(path, callback); }, 100);
	}
}



//点击购买按钮
function clickBuy() {
	console.log('买！');
	//票的数量  如果还不可以购买，这个地方获取会失败 
	const amount = document.getElementsByClassName('mui-amount-increase')[0];
	amount && amount.click();  //+1
	const btnBuy = document.querySelector('');

}


//结算
function checkOut() {
	console.log('结算开始....');
	const btn = document.getElementById('J_Go');
	// 是否勾选了 "全选"
	const checkAllBtn = document.getElementById('J_SelectAll2')
	if (checkAllBtn.getAttribute('class').indexOf('selected') < 0) {
		checkAllBtn.click()
	}
	if (btn) {
		btn.click();
	} else {
		console.log('结算按钮没找到');
	}
}

function checkOutAsync() {
	checkElementState('#J_Go', checkOut);
}

//提交订单
function submitOrder() {
	console.log('提交订单开始....');
	checkElementState('.go-btn', function () {
		const btn = document.querySelector(".go-btn");
		if (btn) {
			btn.click();
		} else {
			console.log('提交订单按钮没找到');
		}
	});
}


//目标时间
const dDate = new Date();  //10点和20点开抢
if (dDate.getHours() < 10) {
	dDate.setHours(9, 59, 59.2);
} else {
	dDate.setHours(19, 59, 59.2);
}

//dDate.setSeconds( dDate.getSeconds() + 10 );

//进入时间判断循环
function enterTimeCheckLoop(callback) {
	const date = new Date();
	const diff = Date.parse(dDate) - Date.parse(date);
	console.log(`距离开始抢购还剩: ${diff}毫秒,记得勾选全选按钮!`);

	if (diff < - 900) {
		console.log('时间过了！');
	} else if (diff < 500) {
		callback && callback();
		console.log('时间到了！！！');
	} else {
		setTimeout(function () { enterTimeCheckLoop(callback); }, 150);
		//console.log('--');
	}

}


//主要函数
function main() {
	console.log('############################开始抢购茅台############################');

	//debugger;
	const href = window.location.href;
	if (href.indexOf('cart.tmall.com') > -1) {
		//结算页面
		//进入时间判断
		enterTimeCheckLoop(checkOutAsync);

	} else if (href.indexOf('buy.tmall.com') > -1) {
		//提交订单页面
		submitOrder();
	}

}


main();