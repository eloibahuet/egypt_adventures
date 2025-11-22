import random

# 這個腳本在 Python 中模擬 main.js 的戰鬥流程（簡化版）
# 用來驗證：符號抽取 -> applySlotResults 行為 -> 敵人自動普攻 -> 戰鬥勝利獎勵

SYMBOLS = ['⚔️','⚡️','🛡️','💀','🧪','⭐','💰']
SYMBOL_WEIGHTS = {'⚔️':6,'⚡️':3,'🛡️':3,'💀':2,'🧪':2,'⭐':4,'💰':2}

def pick_weighted_symbol(rng):
    pool = []
    for s,w in SYMBOL_WEIGHTS.items():
        pool += [s]*w
    return rng.choice(pool)

ITEMS = [
    {'name':'青銅劍','slot':'weapon','atk':3,'rarity':'common'},
    {'name':'鋼鐵劍','slot':'weapon','atk':6,'rarity':'rare'},
    {'name':'皮甲','slot':'armor','def':2,'rarity':'common'},
    {'name':'鋼鐵鎧甲','slot':'armor','def':5,'rarity':'rare'},
    {'name':'幸運護符','slot':'amulet','luck_gold':1,'rarity':'rare'}
]

class SimGame:
    def __init__(self, seed=1):
        self.rng = random.Random(seed)
        self.player = {
            'hp':100,'max_hp':100,'shield':0,'stamina':50,'max_stamina':50,'potions':2,'gold':0,
            'luck_combat':0,'luck_gold':0,'level':1,'xp':0,'inventory':[],'equipment':{'weapon':None,'armor':None,'amulet':None}
        }
        self.enemy = {'hp':100,'max_hp':100,'baseAttack':10,'turnsToAttack':3,'name':'','strength':1.0}
        self.inBattle = False
        self.consec_symbol = None
        self.consec_count = 0
        self.difficulty = 1
        self.logs = []

    def log(self,msg):
        print(msg)
        self.logs.append(msg)

    def gen_enemy_name(self,type_):
        prefixes=['古夫','阿努','賽特','拉','梅特']
        suffixes=['守衛','戰士','祭司','掠奪者','守護者']
        p=self.rng.choice(prefixes); s=self.rng.choice(suffixes)
        title = '敵人'
        if type_=='elite': title='精英'
        elif type_=='mini_boss': title='小頭目'
        return f"{p}{s} {title}"

    def xp_for_next(self,level):
        if level>=99: return float('inf')
        return int(100 * level * (1.06**(level-1)))

    def add_xp(self,amt):
        self.player['xp'] += amt
        self.log(f"獲得經驗值 {amt}。 (總 XP={self.player['xp']})")
        while self.player['level']<99 and self.player['xp']>=self.xp_for_next(self.player['level']):
            need=self.xp_for_next(self.player['level'])
            self.player['xp']-=need
            self.player['level']+=1
            self.player['max_hp']+=10
            self.player['max_stamina']+=5
            self.player['hp']=min(self.player['max_hp'], self.player['hp']+10)
            self.player['stamina']=min(self.player['max_stamina'], self.player['stamina']+5)
            self.log(f"升級！現在等級 {self.player['level']}。")

    def battle(self,type_):
        self.log(f"遭遇 {type_}，進入插槽戰鬥！")
        self.inBattle=True
        self.enemy['name']=self.gen_enemy_name(type_)
        if type_=='elite': self.enemy['strength']=1.6
        elif type_=='mini_boss': self.enemy['strength']=2.4
        else: self.enemy['strength']=1.0
        # scale hp and attack similarly to js
        if type_=='elite':
            self.enemy['max_hp']=150+20*self.difficulty
            self.enemy['baseAttack']=15+5*self.difficulty
        elif type_=='mini_boss':
            self.enemy['max_hp']=250+40*self.difficulty
            self.enemy['baseAttack']=25+8*self.difficulty
        else:
            self.enemy['max_hp']=100+10*self.difficulty
            self.enemy['baseAttack']=10+2*self.difficulty
        self.enemy['hp']=self.enemy['max_hp']
        self.enemy['turnsToAttack']=3
        self.consec_symbol=None
        self.consec_count=0
        self.log(f"敵人：{self.enemy['name']} HP={self.enemy['hp']} 強度x{self.enemy['strength']}")

    def enemy_auto_attack(self):
        raw=self.enemy['baseAttack']
        extra=max(0,self.consec_count-1)*0.12
        dmg=int(raw*(1+extra))
        dodge=min(0.5,0.03+0.02*self.player['luck_combat'])
        if self.rng.random()<dodge:
            self.log(f"你閃避了敵人的自動普攻！(戰鬥幸運 {self.player['luck_combat']})")
        else:
            consumed=min(self.player['shield'],dmg)
            mitigated=max(0,dmg-self.player['shield'])
            self.player['shield']-=consumed
            self.player['hp']-=mitigated
            self.player['stamina']=max(0,self.player['stamina']-5)
            self.log(f"敵人自動普攻，造成 {dmg} 傷害（護盾吸收 {consumed}），玩家 HP -{mitigated}，體力 -5。")
        self.enemy['turnsToAttack']=3

    def apply_slot_results(self,results):
        primary=results[0]
        matchCount=sum(1 for s in results if s==primary)
        self.log(f"主要符號：{primary}，匹配數：{matchCount}")
        if primary=='⚔️':
            base=15*matchCount
            weapon_atk = self.player['equipment']['weapon']['atk'] if self.player['equipment']['weapon'] else 0
            base+=weapon_atk
            crit=min(0.5,0.05+0.03*self.player['luck_combat'])
            isCrit = self.rng.random()<crit
            final=int(base*1.5) if isCrit else base
            self.enemy['hp']-=final
            self.log(f"你發動普通攻擊 x{matchCount}{'（暴擊）' if isCrit else ''}，對敵人造成 {final} 傷害。")
        elif primary=='⚡️':
            base=25*matchCount
            weapon_atk = self.player['equipment']['weapon']['atk'] if self.player['equipment']['weapon'] else 0
            base+=weapon_atk
            crit=min(0.5,0.04+0.03*self.player['luck_combat'])
            isCrit=self.rng.random()<crit
            final=int(base*1.6) if isCrit else base
            self.enemy['hp']-=final
            self.log(f"你使用技能 x{matchCount}{'（暴擊）' if isCrit else ''}，對敵人造成 {final} 傷害。")
        elif primary=='🛡️':
            gain=10*matchCount
            self.player['shield']+=gain
            self.log(f"你獲得防禦 x{matchCount}，護盾 +{gain}。")
        elif primary=='🧪':
            hpGain=30*matchCount
            self.player['hp']=min(self.player['max_hp'],self.player['hp']+hpGain)
            self.log(f"使用紅色水瓶 x{matchCount}，回復 HP {hpGain}。")
        elif primary=='⭐':
            self.player['luck_combat']+=matchCount
            self.log(f"獲得戰鬥幸運 +{matchCount}，提高暴擊與閃避機率。")
        elif primary=='💀':
            raw=10*matchCount
            dodge=min(0.5,0.03+0.02*self.player['luck_combat'])
            if self.rng.random()<dodge:
                self.log(f"你閃避了敵人符號攻擊（戰鬥幸運 {self.player['luck_combat']}）！")
            else:
                consumed=min(self.player['shield'],raw)
                mitigated=max(0,raw-self.player['shield'])
                self.player['shield']-=consumed
                self.player['hp']-=mitigated
                stam_loss=6*matchCount
                self.player['stamina']-=stam_loss
                self.log(f"敵人攻擊 x{matchCount}，原始傷害 {raw}，護盾吸收 {consumed}，實際受損 {mitigated}，體力 -{stam_loss}。")
        elif primary=='💰':
            got=20*matchCount
            self.player['gold']+=got
            self.log(f"獲得金幣 {got}（💰 x{matchCount}）。")
        else:
            self.log('此符號沒有主要效果。')

        # combo
        if self.inBattle:
            if self.consec_symbol==primary:
                self.consec_count+=1
            else:
                self.consec_symbol=primary
                self.consec_count=1
            self.log(f"目前連續主符號：{self.consec_symbol} x{self.consec_count}")
            self.enemy['turnsToAttack']-=1
            if self.enemy['turnsToAttack']<=0:
                self.enemy_auto_attack()
            if self.enemy['hp']<=0:
                self.log('你擊敗了敵人！戰鬥結束，獲得獎勵。')
                reward=20*self.difficulty
                self.player['gold']+=reward
                self.log(f"獲得金幣 {reward}。")
                xpGain=int(15*self.difficulty*(self.enemy['strength'] if self.enemy.get('strength') else 1))
                self.add_xp(xpGain)
                # drop
                roll=self.rng.random()*100
                dropped=None
                if roll<5:
                    dropped=self.rng.choice([i for i in ITEMS if i['rarity']=='rare'])
                elif roll<20:
                    dropped=self.rng.choice([i for i in ITEMS if i['rarity']=='rare'])
                elif roll<50:
                    dropped=self.rng.choice([i for i in ITEMS if i['rarity']=='common'])
                if dropped:
                    self.player['inventory'].append(dropped.copy())
                    self.log(f"敵人掉落：{dropped['name']}（{dropped['rarity']}）")
                self.inBattle=False

        # death check player
        if self.player['hp']<=0:
            if self.player['potions']>0:
                self.player['potions']-=1
                self.player['hp']=self.player['max_hp']
                self.player['stamina']=self.player['max_stamina']
                self.log(f"HP 歸零，消耗一瓶藥水自動復活並回滿 HP/體力。剩餘藥水：{self.player['potions']}")
            else:
                self.log('你倒下了，遊戲結束。沒有藥水可用。')

    def simulate_until_end(self):
        # repeatedly pick slots and apply until battle ends
        turns=0
        while self.inBattle and self.player['hp']>0 and turns<200:
            results=[pick_weighted_symbol(self.rng) for _ in range(3)]
            self.log(f"插槽結果： {' | '.join(results)}")
            self.apply_slot_results(results)
            turns+=1
        return {'player':self.player,'enemy':self.enemy,'logs':self.logs}


def run_sample(seed,encounter):
    g=SimGame(seed)
    g.battle(encounter)
    res=g.simulate_until_end()
    return res

if __name__=='__main__':
    for i,enc in enumerate(['monster','elite','mini_boss']):
        print('\n'+'='*40)
        print(f"模擬遭遇: {enc}")
        out=run_sample(seed=42+i,encounter=enc)
        print('--- 最後玩家狀態 ---')
        print(out['player'])
        print('--- 最後敵人狀態 ---')
        print(out['enemy'])
        print('--- log 最後 10 條 ---')
        for l in out['logs'][-10:]:
            print(l)
