// Smooth-scroll a nav link to its matching section when already on that page
document.querySelectorAll('.nav a[data-section]').forEach(function (link) {
	link.addEventListener('click', function (e) {
		var section = document.querySelector(link.dataset.section);
		if (section) {
			e.preventDefault();
			section.scrollIntoView({ behavior: 'smooth' });
		}
	});
});

// Force the "hover" preview open on tap for touch devices (Websites page)
document.querySelectorAll('.hoverable').forEach(function (el) {
	el.addEventListener('touchstart', function () {
		document.querySelectorAll('.hoverable').forEach(function (h) { h.classList.remove('hovering'); });
		el.classList.add('hovering');
	}, { passive: true });
});

// Contact form (client-side only demo — no backend wired up)
var form = document.getElementById('contact-form');
if (form) {
	var nameInput = document.getElementById('name');
	var emailInput = document.getElementById('email');
	var messageInput = document.getElementById('message');
	var sendBtn = document.getElementById('send');
	var yesBtn = document.getElementById('send-yes');
	var noBtn = document.getElementById('send-no');
	var submitted = document.getElementById('submitted');
	var firstNameSpan = document.getElementById('firstName');

	var prompts = {
		nameEmail: document.getElementById('no-name-no-email'),
		name: document.getElementById('no-name'),
		email: document.getElementById('no-email'),
		badEmail: document.getElementById('bad-email')
	};

	function isBlank(s) { return s.replace(/\s+/g, '') === ''; }
	function isValidEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }

	function hideYesNo() {
		document.querySelectorAll('.yesno').forEach(function (b) { b.style.display = 'none'; });
		Object.values(prompts).forEach(function (p) { p.style.display = 'none'; });
		sendBtn.style.display = '';
	}

	function showPrompt(prompt) {
		sendBtn.style.display = 'none';
		prompt.style.display = 'block';
		document.querySelectorAll('.yesno').forEach(function (b) { b.style.display = 'inline-block'; });
	}

	function send() {
		if (nameInput.value.trim().length > 1) {
			firstNameSpan.textContent = ' ' + nameInput.value.trim().split(' ')[0];
		}
		submitted.style.display = 'block';
		nameInput.value = '';
		emailInput.value = '';
		messageInput.value = '';
		submitted.scrollIntoView({ behavior: 'smooth' });
	}

	sendBtn.addEventListener('click', function () {
		var name = nameInput.value, email = emailInput.value, message = messageInput.value;
		if (isBlank(name) && isBlank(email) && isBlank(message)) {
			[nameInput, emailInput, messageInput].forEach(function (i) { i.classList.add('red-border'); });
			nameInput.focus();
		} else if (isBlank(message)) {
			messageInput.classList.add('red-border');
			messageInput.focus();
		} else if (isBlank(name) && isBlank(email)) {
			showPrompt(prompts.nameEmail);
		} else if (isBlank(name)) {
			showPrompt(prompts.name);
		} else if (isBlank(email)) {
			showPrompt(prompts.email);
		} else if (!isValidEmail(email)) {
			showPrompt(prompts.badEmail);
		} else {
			send();
		}
	});

	yesBtn.addEventListener('click', function () { send(); hideYesNo(); });
	noBtn.addEventListener('click', hideYesNo);

	[nameInput, emailInput, messageInput].forEach(function (i) {
		i.addEventListener('input', function () {
			[nameInput, emailInput, messageInput].forEach(function (j) { j.classList.remove('red-border'); });
		});
	});
}
