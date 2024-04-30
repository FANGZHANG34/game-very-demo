(()=>{
    const oldWindowOnload = window.onload;
    window.onload = ()=>{
        oldWindowOnload();
        const undertaleManager = window.gameManager.undertaleManager = {
            body:{self:makeElement('div',{id: 'undertaleBody'/*,className: 'disappear'*/})},
            undertaleProcess:window.gameManager.undertaleProcess = {
                intervalID: undefined,timeSep: undefined,paused: false,onEvent: undefined,nowFn: undefined,
                defaultFn: ()=>{
                    let temp;
                    if(undertaleManager.fighter.id !== undefined){
                        const previous = [undertaleManager.fighter.x,undertaleManager.fighter.y];
                        if(temp = Object.values(window.gameManager.moveDiraction).at(-1)){
                            switch(temp[0]){
                                case 'Left': previous[0] = Math.min(Math.max(0,undertaleManager.fighter.x + +(temp[1]+'0.1')),50);break;
                                case 'Top': previous[1] = Math.min(Math.max(0,undertaleManager.fighter.y + +(temp[1]+'0.1')),50);break;
                            }
                            undertaleManager.fighter.loader(undertaleManager.fighter.id,...previous);
                        }
                    }
                }
            }
        };
        {
            let temp;
            const fighterCondition = undertaleManager.fighterCondition = {
                id: undefined,object: undefined,allMemory:copyObj(window.gameManager.gameFileSL.origin['0'].memory),self:makeElement('div',{id: 'fighterConditionStage'}),
                loader(objectID){}
            };
            ['Charge','Debuff','Buff','MP','HP','This'].reduce(
                (a,b)=>fighterCondition[temp = 'fighter'+b] = a.insertAdjacentElement('beforebegin',makeElement('div',{id: temp})),
                fighterCondition.self.insertAdjacentElement('beforeend',fighterCondition.fighterPhoto = makeElement('canvas',{id: 'fighterPhoto',width: 720,height: 2025}))
            );
            ['Charge','MP','HP'].forEach(a=>fighterCondition['fighter'+a].insertAdjacentElement('beforeend',makeElement('div',{textContent: a,className: 'fighterInfoName'})).
            insertAdjacentElement('afterend',makeElement('div',{className: 'fighterInfoText'})));
        }
        {
            let temp;
            const UTtheater = undertaleManager.UTtheater = {
                self:makeElement('div',{id: 'UTtheater'}),
                loader(){}
            };
            UTtheater.cornerNodeArray = [0,1,2,3].map(x=>(
                temp = UTtheater.self.insertAdjacentElement('beforeend',makeElement('div',{id: 'UTtheaterCorner'+x,className: 'UTtheaterCorner'})),
                temp.style.cssText = `margin-left: ${50 * !(x % 3)}vw; margin-top: ${50 * (x > 1)}vw;`,temp
            ));
            {
                const UTenemyAttack = UTtheater.enemyAttack = {
                    array: undefined,nodeArray:{},tempNode:makeElement('div',{className: 'enemyAttack',innerHTML: '<div></div>'}),
                    loader(enemyID){
                        for(let i in this.nodeArray){this.nodeArray[i].remove();}
                        this.array = {};
                        this.nodeArray = {};
                        const enemy = Object.assign(objectArray.characterArray.get(enemyID),undertaleManager.fighterCondition.allMemory.object[enemyID]);
                    },
                    mover(){}
                };
            }
            {
                const fighter = undertaleManager.fighter = UTtheater.fighter = {
                    id: 1,object: undefined,x: 25,y: 25,
                    self: UTtheater.self.insertAdjacentElement('beforeend',makeElement('div',{id: 'UTfighter'})),
                    loader(id,x,y){
                        if(this.id !== id){
                            this.id = id;
                            this.object = objectArray.characterArray.get(id);
                            this.display.style.backgroundImage = `url(${this.object.display})`;
                        }
                        this.self.style.marginLeft = (this.x = x)+'vw';this.self.style.marginTop = (this.y = y)+'vw';
                    }
                };
                fighter.display = fighter.self.insertAdjacentElement('beforeend',makeElement('div',{id: 'UTfighterDisplay'}));
            }
        }
        {
            const fighterBoard = undertaleManager.fighterBoard = {
                self:makeElement('div',{id: 'fighterBoard'}),
                fighterSkill:{self:makeElement('div',{id: 'fighterSkill'})},
                fighterItem:{self:makeElement('div',{id: 'fighterItem'})},
                fighterPartner:{self:makeElement('div',{id: 'fighterPartner'})}
            }
            for(let i in fighterBoard){i === 'self' || fighterBoard.self.insertAdjacentElement('beforeend',fighterBoard[i].self);}
        }
        {}{}{}
        document.getElementById('gameMapBoard').insertAdjacentElement('afterend',undertaleManager.body.self).
        insertAdjacentElement('beforeend',undertaleManager.fighterCondition.self).
        insertAdjacentElement('afterend',undertaleManager.UTtheater.self).
        insertAdjacentElement('afterend',undertaleManager.fighterBoard.self);
        window.gameManager.setGameInterval('undertaleProcess',33);
        window.gameManager.playerMove.paused = true;
    }
})();