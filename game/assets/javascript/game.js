var game = {
    result: "start",
    defenderList: [],
    offender: { name: "default", baseAttack: 0, attack: 0, oriHP: 0, HP: 0, counter: 0, tag: "default" },
    defender: { name: "default", baseAttack: 0, attack: 0, oriHP: 0, HP: 0, counter: 0, tag: "default" },
    character: [
        { name: "ken", baseAttack: 10, attack: 10, oriHP: 500, HP: 500, counter: 10, tag: "kenButtonField" },
        { name: "sky", baseAttack: 25, attack: 25, oriHP: 300, HP: 300, counter: 25, tag: "skyButtonField" },
        { name: "sid", baseAttack: 30, attack: 30, oriHP: 200, HP: 200, counter: 30, tag: "sidButtonField" },
        { name: "mau", baseAttack: 20, attack: 20, oriHP: 400, HP: 400, counter: 20, tag: "mauButtonField" },
    ],
    offenderSelect: -1,
    defenderSelect: -1,
    selectCheck: false,
    rosterCheck: false,
    oppCount: 0,
    chooseOffender: function () {
        $("#kenButton").click(function () {
            game.offenderSelect = 0;
            game.rosterCheck = true;
            $(this).addClass("rosterButtonClicked0").removeClass("rosterButton0");
            $("#skyButton").removeClass("rosterButtonClicked1").addClass("rosterButton1");
            $("#sidButton").removeClass("rosterButtonClicked2").addClass("rosterButton2");
            $("#mauButton").removeClass("rosterButtonClicked3").addClass("rosterButton3");
            $("#choose").removeClass("startButton").addClass("startButtonClick");
        });
        $("#skyButton").click(function () {
            game.offenderSelect = 1;
            game.rosterCheck = true;
            $(this).addClass("rosterButtonClicked1").removeClass("rosterButton1");
            $("#kenButton").removeClass("rosterButtonClicked0").addClass("rosterButton0");
            $("#sidButton").removeClass("rosterButtonClicked2").addClass("rosterButton2");
            $("#mauButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#choose").removeClass("startButton").addClass("startButtonClick");
        });
        $("#sidButton").click(function () {
            game.offenderSelect = 2;
            game.rosterCheck = true;
            $(this).addClass("rosterButtonClicked2").removeClass("rosterButton2");
            $("#skyButton").removeClass("rosterButtonClicked1").addClass("rosterButton1");
            $("#kenButton").removeClass("rosterButtonClicked0").addClass("rosterButton0");
            $("#mauButton").removeClass("rosterButtonClicked3").addClass("rosterButton3");
            $("#choose").removeClass("startButton").addClass("startButtonClick");
        });
        $("#mauButton").click(function () {
            game.offenderSelect = 3;
            game.rosterCheck = true;
            $(this).addClass("rosterButtonClicked3").removeClass("rosterButton3");
            $("#skyButton").removeClass("rosterButtonClicked1").addClass("rosterButton1");
            $("#sidButton").removeClass("rosterButtonClicked2").addClass("rosterButton2");
            $("#kenButton").removeClass("rosterButtonClicked0").addClass("rosterButton0");
            $("#choose").removeClass("startButton").addClass("startButtonClick");
        });
        $("#choose").click(function () {
            if (game.rosterCheck === true) {
                $("#choose").slideUp(300);
                game.offender = { ...game.offender, ...game.character[game.offenderSelect] };
                $("#attackerSlot").addClass(game.character[game.offenderSelect].tag).removeClass("charButton").fadeIn(10);
                (game.character).splice(game.offenderSelect, 1);
                $("#start").delay(300).fadeIn(300);
                $(".rosterContainer").delay(600).slideUp(300);
                var elem = document.getElementById("bonusAttack");
                elem.innerHTML = "ATK: " + game.offender.attack;
                var elem = document.getElementById("attHealth")
                elem.innerHTML = game.offender.HP + "/" + game.offender.oriHP;
                game.rosterCheck = false;

            }
        });
    },
    chooseOpponent: function () {
        $("#defenderSlot0").addClass(game.character[0].tag).removeClass("charButton").fadeIn(300);
        $("#defenderSlot1").addClass(game.character[1].tag).removeClass("charButton").fadeIn(300);
        $("#defenderSlot2").addClass(game.character[2].tag).removeClass("charButton").fadeIn(300);

        $("#defenderSlot0").click(function () {
            if (game.selectCheck === false) {
                game.defenderSelect = 0; $("#opponentSlot").addClass(game.character[game.defenderSelect].tag).removeClass("charButton").removeClass(game.character[1].tag).removeClass(game.character[2].tag).fadeIn(300); 
                var elem = document.getElementById("counterAttack");
                elem.innerHTML = "ATK: " + game.character[0].counter;
                game.healthBarReset("oppHealth", game.character[game.defenderSelect].oriHP);
            };


        });
        $("#defenderSlot1").click(function () {
            if (game.selectCheck === false) {
                game.defenderSelect = 1;
                $("#opponentSlot").addClass(game.character[game.defenderSelect].tag).removeClass("charButton").removeClass(game.character[0].tag).removeClass(game.character[2].tag).fadeIn(300); 
                var elem = document.getElementById("counterAttack");
                elem.innerHTML = "ATK: " + game.character[1].counter;
                game.healthBarReset("oppHealth", game.character[game.defenderSelect].oriHP);
            };

        });
        $("#defenderSlot2").click(function () {
            if (game.selectCheck === false) {
                game.defenderSelect = 2;
                $("#opponentSlot").addClass(game.character[game.defenderSelect].tag).removeClass("charButton").removeClass(game.character[0].tag).removeClass(game.character[1].tag).fadeIn(300); 
                var elem = document.getElementById("counterAttack");
                elem.innerHTML = "ATK: " + game.character[2].counter;
                game.healthBarReset("oppHealth", game.character[game.defenderSelect].oriHP);
            };
        });
        $("#choose2").click(function () {
            if (game.selectCheck === false && game.oppCount !=3 ) {
                game.defender = { ...game.defender, ...game.character[game.defenderSelect] };
                $("#opponentSlot").addClass(game.character[game.defenderSelect].tag).removeClass("charButton").fadeIn(300);
                $("#defenderSlot" + [game.defenderSelect]).fadeOut(300);
                $("#rosterContainer" + [game.defenderSelect]).delay(300).slideUp(300);
                game.selectCheck = true;
                game.oppCount += 1;
                game.defenderSelect = null;

            };
        }
        );
    },
    fight: function () {
        $("#fight").click(function () {
            if (game.selectCheck === true) {
                var tempDefHp = game.defender.HP;
                game.defender.HP -= game.offender.attack;
                if (game.defender.HP < 0) {
                    game.defender.HP = 0;
                }
                var tempOffHp = game.offender.HP;
                game.offender.HP -= game.defender.counter;
                if (game.offender.HP < 0) {
                    game.offender.HP = 0;
                }
                game.healthBar("attHealth", game.offender.HP, tempOffHp, game.offender.oriHP);
                game.healthBar("oppHealth", game.defender.HP, tempDefHp, game.defender.oriHP);
                game.offender.attack += game.offender.baseAttack;
                var atk = document.getElementById("bonusAttack");
                atk.innerHTML = "ATK: "+game.offender.attack;
                var elem = document.getElementById("counterAttack");
                elem.innerHTML = "ATK: "+game.defender.counter;
                if (game.offender.HP <= 0) {
                    game.result = "lose";
                    game.winCheck();
                };
                if (game.defender.HP <= 0) {
                    if (game.oppCount === 3) {
                        game.result = "victory";
                        $("#opponentSlot").addClass("charButton").removeClass(game.character[0].tag).removeClass(game.character[1].tag).removeClass(game.character[2].tag).fadeIn(300);
                        game.selectCheck = false;
                        game.winCheck();
                    }
                    game.result = "win";
                    $("#opponentSlot").addClass("charButton").removeClass(game.character[0].tag).removeClass(game.character[1].tag).removeClass(game.character[2].tag).fadeIn(300); game.selectCheck = false;
                    game.winCheck();

                };

            }
        }
        );

    },
    healthBarReset: function (barID, oriHP) {
        var elem = document.getElementById(barID);
        var id = setInterval(frame, 5);
        var des = 100;
        var hp = oriHP / 100;
        var i = 0;
        function frame() {
            if (des <= i) {
                clearInterval(id);
            } else {
                i++;
                elem.style.width = i + "px";
                elem.innerHTML = i * hp + "/" + oriHP;
            }
        }
    },
    healthBar: function (barID, hp, oldHp, oriHP) {
        var elem = document.getElementById(barID);
        var i = 100 * oldHp / oriHP;
        var des = 100 * hp / oriHP;

        var id = setInterval(frame, 5);
        function frame() {
            if (des >= i) {
                clearInterval(id);
            } else {
                i--;
                elem.style.width = i + "px";
                elem.innerHTML = hp + "/" + oriHP;
            }
        }
    },
    round: function () {
        game.chooseOpponent();
        game.fight();
        $("#mainGame").slideDown(300);
        $("#startContainer").slideUp(300);
    },
    winCheck: function () {
        if (game.result === "victory") {
            $("#roster").delay(500).slideUp(300);
            $("#mainGame").delay(500).slideUp(300);
            $("#victory").delay(500).slideDown(300);
            $("#victory").click(function(){ location.reload();});
        }
        if (game.result === "lose") {
            $("#roster").delay(500).slideUp(300);
            $("#mainGame").delay(500).slideUp(300);
            $("#defeat").delay(5000).slideDown(300);
            $("#victory").click(function(){ location.reload();});
        }
    },

    main: function () {
        game.chooseOffender();
        $("#start").click(function () { game.round(); });
    }

}
game.main();