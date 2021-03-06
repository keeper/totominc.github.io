var quest = {
	xp: 0,
	xpNeeded: 100,
	name: "Killing mammoth",
	type: "attack",
	autoIdle: true,
	idleMultiplier: 1.00,

	click: function() {
		if (this.type == "attack")
			this.xp += helpers.playerAttack();
		else
			this.xp += helpers.playerSpeed();

		this.levelUp();
		this.questUp();
	},
	idle: function(times) {
		if (this.autoIdle == true) {
			if (this.type == "attack")
				this.xp += ((helpers.playerAttack() / options.fps) * this.idleMultiplier) * times;
			else
				this.xp += ((helpers.playerSpeed() / options.fps) * this.idleMultiplier) * times;

			this.levelUp();
			this.questUp();
		};
	},
	levelUp: function() {
		if (player.xp >= player.xpNeeded) {
			player.xp -= player.xpNeeded;
			player.level++;
			player.xpNeeded = helpers.playerXpNeeded();
			this.xpNeeded = helpers.questXpNeeded();
		};
	},
	questUp: function() {
		if (this.xp >= this.xpNeeded) {
			this.xp -= this.xpNeeded;
			player.xp += (this.xpNeeded / 4);
			player.gold += helpers.questGold();
			this.gemDrop();
			this.changeType();
			this.name = helpers.questName();
		};
	},
	gemDrop: function() {
		var random = Math.floor(Math.random() * 1000);
		if (random >= 995)
			player.gems++;
	},
	changeType: function() {
		if (this.type == "attack")
			this.type = "speed";
		else
			if (this.type == "speed")
				this.type = "attack";
	},
	trigger: function() {
		if (this.autoIdle == true)
			this.autoIdle = false;
		else
			if (this.autoIdle == false)
				this.autoIdle = true;
	},
	display: function() {
		var progress = Math.floor((this.xp/this.xpNeeded) * 100);
		if (progress > 100)
			progress = 100;
		$("#quest-progressbar").css("width", progress + "%");
		$("#quest-progressbar-percent").html(progress + "%");
		$("#quest-info").html("Quest type : " + this.type);
		$("#quest-name").html(this.name);
		$("#quest-multiplier").html("Idle speed multiplier : x" + fix(this.idleMultiplier, "2d"));
		var progress = Math.floor((player.xp/player.xpNeeded) * 100);
		document.title = "IQ - Level " + player.level + " (" + progress + "%)";
	}
}