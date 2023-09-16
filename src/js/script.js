function login() {
	saveAccount();
	const username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;
	document.querySelector('#pwd').value = password;
	Swal.fire({
		title: 'Success',
		text: 'กรุณารอซักครู่ระบบกำลังล็อกอินให้คุณหากชื่อผู้ใช้และรหัสผ่านถูกต้องหน้าเว็บจะถูกเปลี่ยน',
		icon: 'success',
		timer: 5000,
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
