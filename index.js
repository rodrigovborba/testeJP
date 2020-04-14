// Teams Objects
const team1 = {
    name: "Liverpool",
    emblema: 'https://res.cloudinary.com/dowbnx2lk/image/upload/v1586346656/liverpool_gfdx82.png',
    goalsTotal: 0,
    goalsRodada: 0,
}

const team2 = {
    name: "Manchester City",
    emblema: 'https://res.cloudinary.com/dowbnx2lk/image/upload/v1586368386/manchester-city_ssolbb.png',
    goalsTotal: 0,
    goalsRodada: 0
}

// Player Object
const player = {
    username: "RodrigoJ",
    level: 1,
    xp: 0,
    xpMax: 1500,
    dinheiro: 0,
    ability: 0,
    team: {
        name: team1.name,
        emblema: team1.emblema,
        goalsRodada: team1.goalsRodada,
        goalsTemporada: team1.goalsTotal
    },
    goalsTotal: 0,
    goalsHora: 0,
    goalsRodada: 0,
    goalsTemporada: 0,
    auto: 90,
    penalti: 90,
    falta: 80,
    escanteio: 70
  }

// Array Balls
let balls = [
  {
      color: 'normal',
      goals: 1,
      img: 'teams/bola-normal.png',
  },
  {
      color: 'prata',
      goals: 2,
      img: 'teams/bola-prata.png',
  },
  {
      color: 'ouro',
      goals: 3,
      img: 'teams/bola-ouro.png',
  }
]

// Function that generates a random ball (normal, prata or ouro).
// Possibility normal ball = 85%
// Possibility prata ball = 10%
// Possibility ouro ball = 5%
function generateBall(arr){
    let randomNum = Math.random() * 100;
        if (randomNum < 85){
           return arr[0]
        } else if (randomNum < 95){
           return arr[1]
        } else {
           return arr[2]
        } 
}

// Function that updates the goals of the player and the team.
// If the ball is normal, count 1. If it's prata, count 2. If it's ouro, count 3.
function updateGoals(generatedBall){
    if (generatedBall.goals == 1){
        player.goalsTotal++;
        player.goalsHora++;
        player.goalsRodada++;
        player.goalsTemporada++;
        player.team.goalsRodada++;
        player.team.goalsTemporada++;
    } else if (generatedBall.goals == 2){
        player.goalsTotal += generatedBall.goals;
        player.goalsHora += generatedBall.goals;
        player.goalsRodada += generatedBall.goals;
        player.goalsTemporada += generatedBall.goals;
        player.team.goalsRodada += generatedBall.goals;
        player.team.goalsTemporada += generatedBall.goals;
    } else {
        player.goalsTotal += generatedBall.goals;
        player.goalsHora += generatedBall.goals;
        player.goalsRodada += generatedBall.goals;
        player.goalsTemporada += generatedBall.goals;
        player.team.goalsRodada += generatedBall.goals;
        player.team.goalsTemporada += generatedBall.goals;
    }
}

// Function that updates de Xp, Dinheiro and ability of the player.
function updateXpDinheiroAndAbility(){
    player.xp += 30;
    player.dinheiro += 30;
    if (player.xp >= player.xpMax){
       player.level++;
       player.ability += 10;
       player.dinheiro += 1000;
       player.xp = player.xp - player.xpMax;
       if (player.level <= 10){
           player.xpMax = player.level * 2125
       } else if (player.level > 10 && player.level <= 20){
           player.xpMax = player.level * 4575
       } else if (player.level > 20 && player.level <= 40){
           player.xpMax = player.level * 7125
       } else {
           player.xpMax = player.level * 10125
       }
    }
}

// Function that is going to update all the nodes when something is changed.
function updateNodes(){
let $divGolsHora = document.getElementById('golsHora');
$divGolsHora.innerHTML = '<article> Hora </article>' + '<span>' + player.goalsHora + '</span>'
     
let $divGolsRodada = document.getElementById('golsRodada');
$divGolsRodada.innerHTML = '<article> Rodada </article>' + '<span>' + player.goalsRodada + '</span>'
     
let $divGolsTemporada = document.getElementById('golsTemporada');
$divGolsTemporada.innerHTML = '<article> Temporada </article>' + '<span>' + player.goalsTemporada + '</span>'
     
let $divGolsTotal = document.getElementById('golsTotal');
$divGolsTotal.innerHTML = '<article> Total </article>' + '<span>' + player.goalsTotal + '</span>'
     
let $divLevel = document.getElementById('level');
$divLevel.innerHTML = '<article>Level: ' + player.level + '</article>'

let $divXp = document.getElementById('xp');
$divXp.innerHTML = `<article>${player.xp}/${player.xpMax}</article>`

let $divDinheiro = document.getElementById('dinheiro');
$divDinheiro.innerHTML = '<article>' + player.dinheiro + '</article>'

let $divPenalti = document.getElementById('penalti');
$divPenalti.innerHTML = '<article>Penalti</article>' + '<span>' + player.penalti + '</span>'
     
let $divAuto = document.getElementById('auto');
$divAuto.innerHTML = '<article>Auto</article>' + '<span>' + player.auto + '</span>'
    
let $divFalta = document.getElementById('falta');
$divFalta.innerHTML = '<article>Falta</article>' + '<span>' + player.falta + '</span>'
    
let $divEscanteio = document.getElementById('escanteio');
$divEscanteio.innerHTML = '<article>Escanteio</article>' + '<span>' + player.escanteio + '</span>'

let $progressBar = document.getElementsByClassName('progress-bar-fill')[0]
$progressBar.style.width = `-webkit-calc(${player.xp}/${player.xpMax} * 100%)`;
}

// Function that is going to update the ability of the player.
// If there ability points available, the button 'aumentar habilidade' will show up.
function updateAbility(){
    if (player.ability < 0){
     } else if (player.ability === 0){
     } else {
        let $aumentarButton = document.getElementById('aumentar-btn')
        $aumentarButton.innerHTML = '<button id="aumentar-btn">Aumentar Habilidade</button>'
        $aumentarButton.onclick = function(){
            player.penalti++;
            player.ability--;
            if (player.ability < 1){
                $aumentarButton.innerHTML = ''
            } else {
            }
    $divPenalti.innerHTML = '<article>Penalti</article>' + '<span>' + player.penalti + '</span>'
    $divAbility.innerHTML = '<article>Ability: ' + player.ability + '</article>'
        }
     }
}

$autoButton = document.getElementById('auto-btn');
$penaltiButton = document.getElementById('penalti-btn');
$faltaButton = document.getElementById('falta-btn');
$escanteioButton = document.getElementById('escanteio-btn');

let generatedBall;
let generatedBallStatus;
let fiveMinutes = 60 * 0.1;
let currentTime;

// Function to start the timer of the shoots.
let timer, minutes, seconds;
function startTimer() { 
    timer = fiveMinutes, minutes, seconds;
    currentTime = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $penaltiButton.textContent = minutes + ":" + seconds;

        if (timer > 0) {
            timer--
            $penaltiButton.innerHTML = $penaltiButton.textContent   
            generatedBallStatus = false
            $penaltiButton.style.cursor = 'auto'
        } else {
            generatedBallStatus = true;
            callback();
        }
    }, 1000);
}

// Function that calculates the probability of the goal.
// This function can be used wherever.
function probability(n) {
    return Math.random() < n/100;
  }

// First call of the start timer. When the user is logged in.
startTimer();

let $modal = document.getElementById("myModal");
let $phaserInside = document.getElementById("phaserInside");

// Function that is called when the timer is 0.
function callback() {
    generatedBall = generateBall(balls)
    clearInterval(currentTime);
    console.log($penaltiButton.innerHTML)
    if (generatedBall == true) {
        console.log(generatedBall)
    } else {
        $penaltiButton.style.cursor = 'pointer'
        $penaltiButton.innerHTML = `<img src="${generatedBall.img}">`
        $penaltiButton.onclick = function(){
            let goal = true;
                if(probability(player.penalti)){
                    goal
                } else {
                    goal = false;
                }

// Configuração animação penalti
let config = {
    width: 300,
    height: 300,
    parent: $phaserInside,
    type: Phaser.WEBGL,
    scene: {
        preload: preload,
        create: create
    }
};

$modal.style.display = "block";

// Game is started
let game = new Phaser.Game(config);

// Loading the images
function preload ()
{
    this.load.image('penalti-campo', 'Assets/penalti-campo.png');
    this.load.image('fechar-tela', 'Assets/fechar-tela.png')
    this.load.image('botao-esquerda', 'Assets/botao-esquerda.png')
    this.load.image('botao-meio', 'Assets/botao-meio.png')
    this.load.image('botao-direita', 'Assets/botao-direita.png')
    this.load.image('player', 'Assets/player.png')
    this.load.image('bola', 'Assets/bola.png')
    this.load.image('adversario', 'Assets/adversario.png')
}

// Creating the images
function create ()
{
    let campo = this.add.sprite(150, 150, 'penalti-campo').setInteractive();
    let fecharTela = this.add.image(290, 10, 'fechar-tela').setInteractive({ useHandCursor: true });
    let botaoEsquerda = this.add.image(50, 40, 'botao-esquerda').setInteractive({ useHandCursor: true });
    let botaoMeio = this.add.image(150, 40, 'botao-meio').setInteractive({ useHandCursor: true });
    let botaoDireita = this.add.image(250, 40, 'botao-direita').setInteractive({ useHandCursor: true });
    let playerImage = this.add.image(130, 120, 'player').setInteractive();
    let bola = this.add.image(150, 160, 'bola').setInteractive();
    let adversario = this.add.image(150, 280, 'adversario').setInteractive();

    fecharTela.on('pointerover', function (event) {
        this.setTint(0x4BB28D);
    });

    fecharTela.on('pointerout', function (event) {
        this.clearTint();
    });

    fecharTela.on('pointerdown', function (event) {
        game.canvas.remove();
        $modal.style.display = "none";
    });

    botaoEsquerda.on('pointerover', function (event) {
        this.setTint(0x4BB28D);
    });

    botaoEsquerda.on('pointerout', function (event) {
        this.clearTint();
    });

    botaoEsquerda.on('pointerdown', function (event) {
    botaoEsquerda.visible = false;
    botaoMeio.visible = false;
    botaoDireita.visible = false;
    fecharTela.visible = false;
    if (goal){
        this.scene.tweens.add({
            targets: playerImage,
            x: 150,
            y: 150,
            ease: 'Power1',
            duration: 1000
        });
        this.scene.tweens.add({
            targets: bola,
            x: 120,
            y: 285,
            ease: 'Power2',
            duration: 1000,
            delay: 900
        })
        this.scene.tweens.add({
            targets: adversario,
            x: 180,
            y: 280,
            ease: 'Power2',
            duration: 1000,
            delay: 1000
        })
        updateGoals(generatedBall)
        updateXpDinheiroAndAbility()
    } else {
        this.scene.tweens.add({
            targets: playerImage,
            x: 150,
            y: 150,
            ease: 'Power1',
            duration: 1000
        });
        this.scene.tweens.add({
            targets: bola,
            x: 120,
            y: 270,
            ease: 'Power2',
            duration: 1000,
            delay: 900
        })
        this.scene.tweens.add({
            targets: adversario,
            x: 120,
            y: 280,
            ease: 'Power2',
            duration: 1000,
            delay: 1000
        })
    }
    setTimeout(function(){  
        generatedBallStatus = false;
        startTimer()
        game.canvas.remove();
        $modal.style.display = "none";
        $penaltiButton.style.cursor = 'auto';
        $penaltiButton.innerHTML = '';
        updateNodes()
        updateAbility();
     }, 5000);
        
    });

    botaoMeio.on('pointerover', function (event) {
        this.setTint(0x4BB28D);
    });

    botaoMeio.on('pointerout', function (event) {
        this.clearTint();
    });

    botaoMeio.on('pointerdown', function (event) {
        botaoEsquerda.visible = false;
        botaoMeio.visible = false;
        botaoDireita.visible = false;
        fecharTela.visible = false;
        if (goal){
            this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            this.scene.tweens.add({
                targets: bola,
                x: 150,
                y: 285,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            this.scene.tweens.add({
                targets: adversario,
                x: 180,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
            updateGoals(generatedBall)
            updateXpDinheiroAndAbility()
        } else {
            this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            this.scene.tweens.add({
                targets: bola,
                x: 150,
                y: 270,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            this.scene.tweens.add({
                targets: adversario,
                x: 150,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
        };
        setTimeout(function(){  
            generatedBallStatus = false;
            startTimer()
            game.canvas.remove();
            $modal.style.display = "none";
            $penaltiButton.style.cursor = 'auto';
            $penaltiButton.innerHTML = '';
            updateNodes()
            updateAbility();
         }, 5000);
    });

    botaoDireita.on('pointerover', function (event) {
        this.setTint(0x4BB28D);
    });

    botaoDireita.on('pointerout', function (event) {
        this.clearTint();
    });

    botaoDireita.on('pointerdown', function (event) {
        botaoEsquerda.visible = false;
        botaoMeio.visible = false;
        botaoDireita.visible = false;
        fecharTela.visible = false;
        if (goal){
            this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            this.scene.tweens.add({
                targets: bola,
                x: 180,
                y: 285,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            this.scene.tweens.add({
                targets: adversario,
                x: 130,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
            updateGoals(generatedBall)
            updateXpDinheiroAndAbility()
        } else {
            this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            this.scene.tweens.add({
                targets: bola,
                x: 180,
                y: 270,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            this.scene.tweens.add({
                targets: adversario,
                x: 180,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
        };
        setTimeout(function(){
            generatedBallStatus = false;
            startTimer()
            game.canvas.remove();
            $modal.style.display = "none";
            $penaltiButton.style.cursor = 'auto';
            $penaltiButton.innerHTML = '';
            updateNodes()
            updateAbility();
         }, 5000);
    });    
}
        }
    }
};
    updateNodes()

    let $divEmblema = document.getElementById('emblemaPlayer');
    $divEmblema.innerHTML = '<img class="emblema-player" src="' + player.team.emblema + '"/>'