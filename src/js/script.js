const axios = require('axios');
const qs = require('node:querystring');

function login() {
	const username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;
	axios({
		method: 'POST',
		url: 'http://10.99.92.1/webAuth/',
		data: qs.stringify({
			username: username,
			password: password,
			pwd: password,
			secret: true,
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then((data) => {
			saveAccount();
			Swal.fire({
				title: 'Success',
				text: 'กรุณารอซักครู่ระบบกำลังล็อกอินให้คุณหากชื่อผู้ใช้และรหัสผ่านถูกต้อง',
				icon: 'success',
				timer: 5000,
				timerProgressBar: true,
			});
		})
		.catch((err) => {
			Swal.fire({
				title: 'Error',
				text: 'กรุณาเชื่อมต่ออินเทอร์เน็ตให้เรียบร้อยก่อนจึงจะล็อกอินได้',
				icon: 'error',
				timer: 5000,
				timerProgressBar: true,
			});
		});
}

function saveAccount() {
	const username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;

	const storeAccount = {
		username: username,
		pwd: password,
	};

	localStorage.setItem('account', JSON.stringify(storeAccount));
}

function load() {
	try {
		const account = localStorage.getItem('account');
		const { username, pwd } = JSON.parse(account);
		document.querySelector('#username').value = username;
		document.querySelector('#password').value = pwd;
	} catch (e) {
		return;
	}
}
