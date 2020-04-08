const player = {
    username: "RodrigoJ",
    level: 1,
    xp: 0,
    dinheiro: 0,
    ability: 0,
    team: {
        name: "Liverpool",
        emblema: 'https://res.cloudinary.com/dowbnx2lk/image/upload/v1586346656/liverpool_gfdx82.png',
        goalsRodada: 0,
        goalsTemporada: 0
    },
    goalsTotal: 0,
    goalsHora: 0,
    goalsRodada: 0,
    goalsTemporada: 0,
    penalti: 10
  }             
                
let penaltiButton = document.getElementById('penalti-btn')
penaltiButton.onclick = function(){
    let goal = true;
    function probability(n) {
        return Math.random() < n/100;
     }
     
     if(probability(player.penalti)){
         goal
     } else {
       goal = false;
     }
     
     if(goal){
       player.goalsTotal++;
       player.goalsHora++;
       player.goalsRodada++;
       player.goalsTemporada++;
       player.team.goalsRodada++
       player.team.goalsTemporada++
       player.xp += 300;
       player.dinheiro += 300;
     } else {
       console.log("perdeeeeu")
     }

     switch(player.goalsTotal){
        case 3:
            player.level = 2;
            player.xp += 1000;
            player.dinheiro += 1000;
            player.ability += 1;
            break;
        case 5:
            player.level = 3;
            player.xp += 1000;
            player.dinheiro += 1000;
            player.ability += 1;
            break;
        case 10:
            player.level = 4;
            player.xp += 1000;
            player.dinheiro += 1000;
            player.ability += 1;
            break;
        }
     
     console.log(player)
     
     let divGolsHora = document.getElementById('golsHora');
     divGolsHora.innerHTML = '<article> Gols Hora:' + player.goalsHora + '</article>'
     
     let divGolsRodada = document.getElementById('golsRodada');
     divGolsRodada.innerHTML = '<article> Gols Rodada:' + player.goalsRodada + '</article>'
     
     let divGolsTemporada = document.getElementById('golsTemporada');
     divGolsTemporada.innerHTML = '<article> Gols Temporada:' + player.goalsTemporada + '</article>'
     
     let divLevel = document.getElementById('level');
     divLevel.innerHTML = '<article>Level: ' + player.level + '</article>'

     let divXp = document.getElementById('xp');
     divXp.innerHTML = '<article>XP: ' + player.xp + '</article>'

     let divDinheiro = document.getElementById('dinheiro');
     divDinheiro.innerHTML = '<article>Dinheiro: ' + player.dinheiro + '</article>'

     let divAbility = document.getElementById('ability');
     divAbility.innerHTML = '<article>Ability: ' + player.ability + '</article>'
    }

    
    let divEmblema = document.getElementById('emblemaPlayer');
    divEmblema.innerHTML = '<article>Team:  </article> <img class="emblema-player" src="' + player.team.emblema + '"/>'

    let divName = document.getElementById('userName');
    divName.innerHTML = '<article>User: ' + player.username + '</article>'
