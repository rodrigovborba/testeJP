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
    penalti: 100
  }
                
let $penaltiButton = document.getElementById('penalti-btn')
$penaltiButton.onclick = function(){

    let goal = true;
    function probability(n) {
        return Math.random() < n/100;
     }
     
     if(probability(player.penalti)){
         goal
     } else {
       goal = false;
     }

    // Configuração animação penalti
    let config = {
        width: 300,
        height: 300,
        type: Phaser.WEBGL,
        scene: {
            preload: preload,
            create: create
        }
    };
    // Animação Penalti
    let game = new Phaser.Game(config);

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

function create ()
{
    let campo = this.add.sprite(150, 150, 'penalti-campo').setInteractive();
    let fecharTela = this.add.image(290, 10, 'fechar-tela').setInteractive();
    let botaoEsquerda = this.add.image(50, 40, 'botao-esquerda').setInteractive();
    let botaoMeio = this.add.image(150, 40, 'botao-meio').setInteractive();
    let botaoDireita = this.add.image(250, 40, 'botao-direita').setInteractive();
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
            let playerAnimationGoal = this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            let bolaAnimationGoal = this.scene.tweens.add({
                targets: bola,
                x: 120,
                y: 285,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            let adversarioAnimationGoal = this.scene.tweens.add({
                targets: adversario,
                x: 180,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
            console.log(player)
            player.goalsTotal++;
       player.goalsHora++;
       player.goalsRodada++;
       player.goalsTemporada++;
       player.team.goalsRodada++;
       player.team.goalsTemporada++;
       player.xp += 30;
       player.dinheiro += 30;
       player.xpToNextLevel -= player.xp;
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
        } else {
            let playerAnimationPerdeu = this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            let bolaAnimationPerdeu = this.scene.tweens.add({
                targets: bola,
                x: 120,
                y: 270,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            let adversarioAnimationPerdeu = this.scene.tweens.add({
                targets: adversario,
                x: 120,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
        }
        setTimeout(function(){ game.canvas.remove(); }, 5000);
        setTimeout(function(){ 
            let $divGolsHora = document.getElementById('golsHora');
     $divGolsHora.innerHTML = '<article> Gols Hora:' + player.goalsHora + '</article>'
     
     let $divGolsRodada = document.getElementById('golsRodada');
     $divGolsRodada.innerHTML = '<article> Gols Rodada:' + player.goalsRodada + '</article>'
     
     let $divGolsTemporada = document.getElementById('golsTemporada');
     $divGolsTemporada.innerHTML = '<article> Gols Temporada:' + player.goalsTemporada + '</article>'
     
     let $divLevel = document.getElementById('level');
     $divLevel.innerHTML = '<article>Level: ' + player.level + '</article>'

     let $divXp = document.getElementById('xp');
     $divXp.innerHTML = '<article>XP: ' + player.xp + '</article>'

     let $divXpMax = document.getElementById('xpMax');
     $divXpMax.innerHTML = '<article>XP máximo: ' + player.xpMax + '</article>'

     let $divDinheiro = document.getElementById('dinheiro');
     $divDinheiro.innerHTML = '<article>Dinheiro: ' + player.dinheiro + '</article>'

     let $divAbility = document.getElementById('ability');
     $divAbility.innerHTML = '<article>Ability: ' + player.ability + '</article>'

     let $divPenalti = document.getElementById('penalti');
    $divPenalti.innerHTML = '<article>Porcentagem Penalti: ' + player.penalti + '</article>'

     console.log("habilidade: ", player.ability)
     
     if (player.ability < 0){
        console.log("Não pode ter menos de 0 habilidades")
     } else if (player.ability === 0){
        console.log("Você não tem habilidades para aumentar")
     } else {
        let $aumentarButton = document.getElementById('aumentar-btn')
        $aumentarButton.innerHTML = '<button id="aumentar-btn">Aumentar Habilidade</button>'
        $aumentarButton.onclick = function(){
            player.penalti++;
            player.ability--;
            if (player.ability < 1){
                $aumentarButton.innerHTML = ''
            } else {
                console.log("Não tem mais nenhuma habilidade")
            }
    $divPenalti.innerHTML = '<article>Porcentagem Penalti: ' + player.penalti + '</article>'
    $divAbility.innerHTML = '<article>Ability: ' + player.ability + '</article>'
        }
     }
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
            console.log(botaoMeio)
            let playerAnimationGoal = this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            let bolaAnimationGoal = this.scene.tweens.add({
                targets: bola,
                x: 150,
                y: 285,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            let adversarioAnimationGoal = this.scene.tweens.add({
                targets: adversario,
                x: 180,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
            player.goalsTotal++;
       player.goalsHora++;
       player.goalsRodada++;
       player.goalsTemporada++;
       player.team.goalsRodada++;
       player.team.goalsTemporada++;
       player.xp += 30;
       player.dinheiro += 30;
       player.xpToNextLevel -= player.xp;
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
        } else {
            let playerAnimationPerdeu = this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            let bolaAnimationPerdeu = this.scene.tweens.add({
                targets: bola,
                x: 150,
                y: 270,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            let adversarioAnimationPerdeu = this.scene.tweens.add({
                targets: adversario,
                x: 150,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
        }
        setTimeout(function(){ game.canvas.remove(); }, 5000);
        setTimeout(function(){ 
            let $divGolsHora = document.getElementById('golsHora');
     $divGolsHora.innerHTML = '<article> Gols Hora:' + player.goalsHora + '</article>'
     
     let $divGolsRodada = document.getElementById('golsRodada');
     $divGolsRodada.innerHTML = '<article> Gols Rodada:' + player.goalsRodada + '</article>'
     
     let $divGolsTemporada = document.getElementById('golsTemporada');
     $divGolsTemporada.innerHTML = '<article> Gols Temporada:' + player.goalsTemporada + '</article>'
     
     let $divLevel = document.getElementById('level');
     $divLevel.innerHTML = '<article>Level: ' + player.level + '</article>'

     let $divXp = document.getElementById('xp');
     $divXp.innerHTML = '<article>XP: ' + player.xp + '</article>'

     let $divXpMax = document.getElementById('xpMax');
     $divXpMax.innerHTML = '<article>XP máximo: ' + player.xpMax + '</article>'

     let $divDinheiro = document.getElementById('dinheiro');
     $divDinheiro.innerHTML = '<article>Dinheiro: ' + player.dinheiro + '</article>'

     let $divAbility = document.getElementById('ability');
     $divAbility.innerHTML = '<article>Ability: ' + player.ability + '</article>'

     let $divPenalti = document.getElementById('penalti');
    $divPenalti.innerHTML = '<article>Porcentagem Penalti: ' + player.penalti + '</article>'

     console.log("habilidade: ", player.ability)
     
     if (player.ability < 0){
        console.log("Não pode ter menos de 0 habilidades")
     } else if (player.ability === 0){
        console.log("Você não tem habilidades para aumentar")
     } else {
        let $aumentarButton = document.getElementById('aumentar-btn')
        $aumentarButton.innerHTML = '<button id="aumentar-btn">Aumentar Habilidade</button>'
        $aumentarButton.onclick = function(){
            player.penalti++;
            player.ability--;
            if (player.ability < 1){
                $aumentarButton.innerHTML = ''
            } else {
                console.log("Não tem mais nenhuma habilidade")
            }
    $divPenalti.innerHTML = '<article>Porcentagem Penalti: ' + player.penalti + '</article>'
    $divAbility.innerHTML = '<article>Ability: ' + player.ability + '</article>'
        }
     }
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
            console.log(botaoDireita)
            let playerAnimationGoal = this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            let bolaAnimationGoal = this.scene.tweens.add({
                targets: bola,
                x: 180,
                y: 285,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            let adversarioAnimationGoal = this.scene.tweens.add({
                targets: adversario,
                x: 130,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
            player.goalsTotal++;
       player.goalsHora++;
       player.goalsRodada++;
       player.goalsTemporada++;
       player.team.goalsRodada++;
       player.team.goalsTemporada++
       player.xp += 30;
       player.dinheiro += 30;
       player.xpToNextLevel -= player.xp;
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
        } else {
            let playerAnimationPerdeu = this.scene.tweens.add({
                targets: playerImage,
                x: 150,
                y: 150,
                ease: 'Power1',
                duration: 1000
            });
            let bolaAnimationPerdeu = this.scene.tweens.add({
                targets: bola,
                x: 180,
                y: 270,
                ease: 'Power2',
                duration: 1000,
                delay: 900
            })
            let adversarioAnimationPerdeu = this.scene.tweens.add({
                targets: adversario,
                x: 180,
                y: 280,
                ease: 'Power2',
                duration: 1000,
                delay: 1000
            })
        }
        setTimeout(function(){ game.canvas.remove(); }, 5000);
        setTimeout(function(){ 
            let $divGolsHora = document.getElementById('golsHora');
     $divGolsHora.innerHTML = '<article> Gols Hora:' + player.goalsHora + '</article>'
     
     let $divGolsRodada = document.getElementById('golsRodada');
     $divGolsRodada.innerHTML = '<article> Gols Rodada:' + player.goalsRodada + '</article>'
     
     let $divGolsTemporada = document.getElementById('golsTemporada');
     $divGolsTemporada.innerHTML = '<article> Gols Temporada:' + player.goalsTemporada + '</article>'
     
     let $divLevel = document.getElementById('level');
     $divLevel.innerHTML = '<article>Level: ' + player.level + '</article>'

     let $divXp = document.getElementById('xp');
     $divXp.innerHTML = '<article>XP: ' + player.xp + '</article>'

     let $divXpMax = document.getElementById('xpMax');
     $divXpMax.innerHTML = '<article>XP máximo: ' + player.xpMax + '</article>'

     let $divDinheiro = document.getElementById('dinheiro');
     $divDinheiro.innerHTML = '<article>Dinheiro: ' + player.dinheiro + '</article>'

     let $divAbility = document.getElementById('ability');
     $divAbility.innerHTML = '<article>Ability: ' + player.ability + '</article>'

     let $divPenalti = document.getElementById('penalti');
    $divPenalti.innerHTML = '<article>Porcentagem Penalti: ' + player.penalti + '</article>'

     console.log("habilidade: ", player.ability)
     
     if (player.ability < 0){
        console.log("Não pode ter menos de 0 habilidades")
     } else if (player.ability === 0){
        console.log("Você não tem habilidades para aumentar")
     } else {
        let $aumentarButton = document.getElementById('aumentar-btn')
        $aumentarButton.innerHTML = '<button id="aumentar-btn">Aumentar Habilidade</button>'
        $aumentarButton.onclick = function(){
            player.penalti++;
            player.ability--;
            if (player.ability < 1){
                $aumentarButton.innerHTML = ''
            } else {
                console.log("Não tem mais nenhuma habilidade")
            }
    $divPenalti.innerHTML = '<article>Porcentagem Penalti: ' + player.penalti + '</article>'
    $divAbility.innerHTML = '<article>Ability: ' + player.ability + '</article>'
        }
     }
         }, 5000);
    });   
  }  
     
    }
    let $divGolsHora = document.getElementById('golsHora');
    $divGolsHora.innerHTML = '<article> Gols Hora:' + player.goalsHora + '</article>'
    
    let $divGolsRodada = document.getElementById('golsRodada');
    $divGolsRodada.innerHTML = '<article> Gols Rodada:' + player.goalsRodada + '</article>'
    
    let $divGolsTemporada = document.getElementById('golsTemporada');
    $divGolsTemporada.innerHTML = '<article> Gols Temporada:' + player.goalsTemporada + '</article>'
    
    let $divLevel = document.getElementById('level');
    $divLevel.innerHTML = '<article>Level: ' + player.level + '</article>'

    let $divXp = document.getElementById('xp');
    $divXp.innerHTML = '<article>XP: ' + player.xp + '</article>'

    let $divXpMax = document.getElementById('xpMax');
    $divXpMax.innerHTML = '<article>XP máximo: ' + player.xpMax + '</article>'

    let $divDinheiro = document.getElementById('dinheiro');
    $divDinheiro.innerHTML = '<article>Dinheiro: ' + player.dinheiro + '</article>'

    let $divAbility = document.getElementById('ability');
    $divAbility.innerHTML = '<article>Ability: ' + player.ability + '</article>'

    let $divPenalti = document.getElementById('penalti');
   $divPenalti.innerHTML = '<article>Porcentagem Penalti: ' + player.penalti + '</article>'
    
    let $divEmblema = document.getElementById('emblemaPlayer');
    $divEmblema.innerHTML = '<article>Team:  </article> <img class="emblema-player" src="' + player.team.emblema + '"/>'

    let $divName = document.getElementById('userName');
    $divName.innerHTML = '<article>User: ' + player.username + '</article>'