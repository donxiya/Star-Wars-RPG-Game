var game = {
    result: "start",
    defenderList: [],
    offender: { name: "default", baseAttack: 0, attack: 0, oriHP: 100, HP: 100, counter: 0, tag: "default" },
    defender: { name: "default", baseAttack: 0, attack: 0, oriHP: 100, HP: 100, counter: 0, tag: "default" },
    character: [
        { name: "ken", baseAttack: 10, attack: 10, oriHP: 100, HP: 100, counter: 10, tag: "kenButtonField" },
        { name: "sky", baseAttack: 10, attack: 10, oriHP: 100, HP: 100, counter: 10, tag: "skyButtonField" },
        { name: "sid", baseAttack: 10, attack: 10, oriHP: 100, HP: 100, counter: 10, tag: "sidButtonField" },
        { name: "mau", baseAttack: 10, attack: 10, oriHP: 100, HP: 100, counter: 10, tag: "mauButtonField" },
    ],
    offenderSelect: -1,
    defenderSelect: -1,
    selectCheck: false,
    rosterCheck: false,
    oppCount: 0,
    chooseOffender: function () {
        console.log("offender");
        $("#kenButton").click(function () {
            game.offenderSelect = 0;
            console.log("KEN");
            game.rosterCheck = true;
            $(this).addClass("rosterButtonClicked").removeClass("rosterButton");
            $("#skyButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#sidButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#mauButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#choose").removeClass("startButton").addClass("startButtonClick");
        });
        $("#skyButton").click(function () {
            game.offenderSelect = 1;
            console.log("SKY");
            game.rosterCheck = true;
            $(this).addClass("rosterButtonClicked").removeClass("rosterButton");
            $("#kenButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#sidButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#mauButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#choose").removeClass("startButton").addClass("startButtonClick");
        });
        $("#sidButton").click(function () {
            game.offenderSelect = 2;
            console.log("SID");
            game.rosterCheck = true;
            $(this).addClass("rosterButtonClicked").removeClass("rosterButton");
            $("#skyButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#kenButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#mauButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#choose").removeClass("startButton").addClass("startButtonClick");
        });
        $("#mauButton").click(function () {
            game.offenderSelect = 3;
            console.log("MAU");
            game.rosterCheck = true;
            $(this).addClass("rosterButtonClicked").removeClass("rosterButton");
            $("#skyButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#sidButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#kenButton").removeClass("rosterButtonClicked").addClass("rosterButton");
            $("#choose").removeClass("startButton").addClass("startButtonClick");
        });
        $("#choose").click(function () {
            if (game.rosterCheck === true) {
                console.log("choose");
                $("#choose").slideUp(500);
                console.log(game.character[game.offenderSelect]);
                game.offender = { ...game.offender, ...game.character[game.offenderSelect] };
                console.log(game.character[game.offenderSelect].tag);
                $("#attackerSlot").addClass(game.character[game.offenderSelect].tag).removeClass("charButton").fadeIn(500);

                (game.character).splice(game.offenderSelect, 1);
                $("#start").delay(500).fadeIn(500);
                $(".rosterContainer").delay(500).slideUp(1000);
                console.log(game.offender);
                var elem = document.getElementById("bonusAttack");
                elem.innerHTML = game.offender.attack;
                var elem = document.getElementById("attHealth")
                elem.innerHTML = game.offender.HP + "/" + game.offender.oriHP;
                game.rosterCheck = false;

            }
        });
    },
    chooseOpponent: function () {
        console.log("opponent");
        console.log(game.defenderSelect);
        $("#defenderSlot0").addClass(game.character[0].tag).removeClass("charButton").fadeIn(500);
        $("#defenderSlot1").addClass(game.character[1].tag).removeClass("charButton").fadeIn(500);
        $("#defenderSlot2").addClass(game.character[2].tag).removeClass("charButton").fadeIn(500);

        $("#defenderSlot0").click(function () {
            game.defenderSelect = 0; $("#opponentSlot").addClass(game.character[game.defenderSelect].tag).removeClass("charButton").removeClass(game.character[1].tag).removeClass(game.character[2].tag).fadeIn(500); console.log(game.defenderSelect);
            var elem = document.getElementById("counterAttack");
            elem.innerHTML = game.character[0].counter;
            game.healthBarReset("oppHealth", game.defender.oriHP);
        });
        $("#defenderSlot1").click(function () {
            game.defenderSelect = 1;
            $("#opponentSlot").addClass(game.character[game.defenderSelect].tag).removeClass("charButton").removeClass(game.character[0].tag).removeClass(game.character[2].tag).fadeIn(500); console.log(game.defenderSelect);
            var elem = document.getElementById("counterAttack");
            elem.innerHTML = game.character[1].counter;
            game.healthBarReset("oppHealth", game.defender.oriHP);
        });
        $("#defenderSlot2").click(function () {
            game.defenderSelect = 2;
            $("#opponentSlot").addClass(game.character[game.defenderSelect].tag).removeClass("charButton").removeClass(game.character[0].tag).removeClass(game.character[1].tag).fadeIn(500); console.log(game.defenderSelect);
            var elem = document.getElementById("counterAttack");
            elem.innerHTML = game.character[2].counter;
            game.healthBarReset("oppHealth", game.defender.oriHP);

        });
        $("#choose2").click(function () {
            if (game.selectCheck === false) {
                game.defender = { ...game.defender, ...game.character[game.defenderSelect] };
                $("#opponentSlot").addClass(game.character[game.defenderSelect].tag).removeClass("charButton").fadeIn(500);
                $("#defenderSlot" + [game.defenderSelect]).fadeOut(500);
                game.selectCheck = true;
                game.oppCount += 1;
                $("#rosterContainer" + [game.defenderSelect]).delay(500).slideUp(500);
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
                game.healthBar("attHealth", game.offender.HP, tempDefHp, game.offender.oriHP);
                game.healthBar("oppHealth", game.defender.HP, tempOffHp, game.defender.oriHP);
                game.offender.attack += game.offender.baseAttack;
                var atk = document.getElementById("counterAttack");
                atk.innerHTML = game.offender.attack;
                var elem = document.getElementById("bonusAttack");
                elem.innerHTML = game.defender.counter;
                if (game.offender.HP <= 0) {
                    game.result = "lose";
                    return game.result;
                };
                if (game.defender.HP <= 0) {
                    if (game.oppCount === 3) {
                        game.result = "victory";
                        $("#opponentSlot").addClass("charButton").removeClass(game.character[0].tag).removeClass(game.character[1].tag).removeClass(game.character[2].tag).fadeIn(500);
                        game.selectCheck = false;
                        return game.result;
                    }
                    game.result = "win";
                    $("#opponentSlot").addClass("charButton").removeClass(game.character[0].tag).removeClass(game.character[1].tag).removeClass(game.character[2].tag).fadeIn(500); game.selectCheck = false;
                    return game.result;

                };
            }
            game.winCheck();
        }
        );

    },
    healthBarReset: function (barID, oriHP) {
        var elem = document.getElementById(barID);
        var id = setInterval(frame, 10);
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
        var id = setInterval(frame, 10);
        var des = 100 * hp / oriHP;
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
        $("#mainGame").slideDown(500);
        $("#startContainer").slideUp(500);
    },
    winCheck: function () {
        if (game.result === "victory") { console.log("vic"); }
        else if (game.result === "lose") { console.log("lose"); }
    },

    main: function () {
        game.chooseOffender();

        $("#start").click(function () { game.round(); });
    }

}
game.main();