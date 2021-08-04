const getRandom = (min, max)=>{
    return Math.floor( Math.random() * (max - min) + min );
}

const app = Vue.createApp({

    data(){
        return {
            playerHealth : 100,
            monsterHealth : 100,
            matchRounds : 0,
            winner : null,
            gameLog : [],
        };
    },
    computed : {
        playerHealthIndicator(){
            if ( this.playerHealth < 0){
                return {width : '0%'};
            }
            return {width :  this.playerHealth + '%'};
        },
        monsterHealthIndicator(){
            if ( this.monsterHealth < 0){
                return {width : '0%'};
            }
            return {width : this.monsterHealth + '%'};
        },
        isSpecialAttackAvailable(){
            return this.matchRounds % 3 !== 0;
        },
        isHealAvailable(){
            return this.playerHealth === 100;
        }
    },
    watch : {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = "draw";
            }
            else if(value <= 0){
                this.winner = "monster";
            }
        },
        monsterHealth(value){
            if(value <=0 && this.playerHealth <= 0){
                this.winner = "draw";
            }
            else if(value <= 0){
                this.winner = "player";
            }
        }

    },
    methods : {
        restartGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.matchRounds = 0;
            this.winner = null;
            this.gameLog = [];
        },
        playerAttack(){
            this.matchRounds = this.matchRounds + 1;
            const attackValue = getRandom(5, 10);
            this.monsterHealth -= attackValue;
            this.addGameLogDetails("player", "attack", attackValue);
            this.monsterAttack();
        },
        monsterAttack(){
            const attackValue = getRandom(8, 13);
            this.playerHealth -= attackValue;
            this.addGameLogDetails("monster", "attack", attackValue);
        },
        playerSpecialAttack(){
            this.matchRounds = this.matchRounds + 1;
            const attackValue = getRandom(10, 20);
            this.monsterHealth -= attackValue;
            this.addGameLogDetails("player", "attack", attackValue);
            this.monsterAttack();
        },
        playerHealing(){
            
            this.matchRounds = this.matchRounds + 1;
            const healingValue = getRandom(10, 20);
            if( this.playerHealth + healingValue >= 100 ){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healingValue;
            }
            this.addGameLogDetails("player", "heal", healingValue);
            this.monsterAttack();
            
        },
        playerSurrender(){
            this.winner = "monster";
            this.addGameLogDetails("player", "surrender", 0);
        },
        addGameLogDetails( who, what, value ) {
            this.gameLog.unshift({
                round : this.matchRounds,
                actionBy : who,
                actionType : what,
                actionValue : value,
            });

        }
        
        
    }
    
});
app.mount("#game");