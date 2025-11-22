import random

# 玩家屬性
class Player:
    def __init__(self):
        self.hp = 100
        self.max_hp = 100
        self.stamina = 50
        self.luck = 10
        self.gold = 500
        self.potions = 2
        self.equipment = []
        self.set_items = []
        self.blessings = []
        self.curses = []
        self.weapon_skills = []

# 地圖格事件
EVENTS = [
    'monster', 'elite', 'mini_boss', 'merchant', 'black_market', 'oasis', 'sandstorm', 'egyptian_god', 'pyramid', 'empty'
]

# 輪盤格子
SPIN_SLOTS = ['attack', 'defend', 'skill', 'heal', 'enemy', 'attack', 'defend', 'skill', 'heal']

# 主流程
class Game:
    def __init__(self):
        self.player = Player()
        self.map_steps = 0
        self.map_goal = 30
        self.difficulty = 1
        self.in_dungeon = False

    def start(self):
        print('--- 古埃及沙漠輪盤冒險 ---')
        print('你在驛站，擁有2瓶回復藥水和500金幣。')
        while True:
            if self.map_steps >= self.map_goal:
                self.next_map()
            self.show_status()
            action = input('選擇移動方向（前/左/右）或驛站（rest/shop/leave）：')
            if action in ['前', '左', '右']:
                self.move(action)
            elif action == 'rest':
                self.rest()
            elif action == 'shop':
                self.shop()
            elif action == 'leave':
                print('離開驛站，繼續冒險！')
            else:
                print('無效指令，請重新選擇。')

    def show_status(self):
        print(f'HP:{self.player.hp}/{self.player.max_hp} 體力:{self.player.stamina} 金幣:{self.player.gold} 藥水:{self.player.potions}')
        print(f'已移動步數：{self.map_steps}/{self.map_goal} 難度：{self.difficulty}')

    def move(self, direction):
        self.map_steps += 1
        event = random.choices(EVENTS, weights=[30,10,5,10,5,5,10,5,2,18])[0]
        print(f'你往{direction}走，遇到事件：{event}')
        if event == 'monster':
            self.battle('普通怪物')
        elif event == 'elite':
            self.battle('菁英怪物')
        elif event == 'mini_boss':
            self.battle('小頭目')
        elif event == 'merchant':
            self.merchant()
        elif event == 'black_market':
            self.black_market()
        elif event == 'oasis':
            self.oasis()
        elif event == 'sandstorm':
            self.sandstorm()
        elif event == 'egyptian_god':
            self.god_event()
        elif event == 'pyramid':
            self.pyramid()
        else:
            print('什麼都沒發生。')

    def rest(self):
        print('你在驛站休息，恢復部分生命和體力。')
        self.player.hp = min(self.player.max_hp, self.player.hp + 30)
        self.player.stamina = min(50, self.player.stamina + 20)

    def shop(self):
        print('驛站商店：1.購買藥水(50金) 2.強化裝備(100金) 3.販售裝備(隨機價)')
        choice = input('選擇商店功能（1/2/3）：')
        if choice == '1':
            if self.player.gold >= 50:
                self.player.gold -= 50
                self.player.potions += 1
                print('購買成功，藥水+1')
            else:
                print('金幣不足！')
        elif choice == '2':
            print('裝備強化功能尚未開放。')
        elif choice == '3':
            print('販售裝備功能尚未開放。')
        else:
            print('無效選擇。')

    def battle(self, enemy_type):
        print(f'遭遇{enemy_type}，進入輪盤戰鬥！')
        spin_result = random.choices(SPIN_SLOTS, k=3)
        print(f'輪盤結果：{spin_result}')
        if 'enemy' in spin_result:
            print('敵人攻擊！你損失20生命。')
            self.player.hp -= 20
        else:
            dmg = spin_result.count('attack') * 15
            heal = spin_result.count('heal') * 10
            print(f'你造成{dmg}傷害，恢復{heal}生命。')
            self.player.hp = min(self.player.max_hp, self.player.hp + heal)
        if self.player.hp <= 0:
            print('你倒下了，遊戲結束。')
            exit()

    def merchant(self):
        print('遇到商隊，可補給藥水（50金/瓶）。')
        if self.player.gold >= 50:
            self.player.gold -= 50
            self.player.potions += 1
            print('補給成功，藥水+1')
        else:
            print('金幣不足！')

    def black_market(self):
        print('遇到黑市商人，隨機提供5件裝備，最多選2件。')
        items = [f'裝備{random.randint(1,100)}' for _ in range(5)]
        print('可選裝備：', items)
        choices = input('請輸入你要的裝備編號（用逗號分隔，最多2件）：')
        selected = choices.split(',')[:2]
        for idx in selected:
            try:
                item = items[int(idx)-1]
                self.player.equipment.append(item)
                print(f'獲得：{item}')
            except:
                print('選擇錯誤，跳過。')

    def oasis(self):
        print('發現綠洲，恢復生命和體力。')
        self.player.hp = min(self.player.max_hp, self.player.hp + 20)
        self.player.stamina = min(50, self.player.stamina + 10)

    def sandstorm(self):
        print('遭遇沙漠風暴！選擇休息或前進（rest/forward）：')
        choice = input()
        if choice == 'rest':
            if random.random() < 0.5:
                print('風暴持續，損失10體力。')
                self.player.stamina -= 10
            else:
                print('休息成功，恢復10生命。')
                self.player.hp = min(self.player.max_hp, self.player.hp + 10)
        elif choice == 'forward':
            if random.random() < 0.5:
                print('成功避開風暴，敏捷提升！')
                self.player.luck += 2
            else:
                print('裝備損壞！')
                if self.player.equipment:
                    lost = self.player.equipment.pop()
                    print(f'失去裝備：{lost}')
                else:
                    print('你沒有裝備可損壞。')
        else:
            print('無效選擇。')

    def god_event(self):
        print('遇到古埃及神祇，接受任務（y/n）？')
        choice = input()
        if choice == 'y':
            if random.random() < 0.5:
                print('任務完成，獲得祝福！')
                self.player.blessings.append('神祇祝福')
            else:
                print('任務失敗，獲得詛咒！')
                self.player.curses.append('神祇詛咒')
        else:
            print('你選擇不接受任務。')

    def pyramid(self):
        print('發現金字塔副本，怪物更強，掉落可收集套裝。')
        # 副本簡化流程
        if random.random() < 0.5:
            print('打倒守護者，獲得孔斯套裝部件！')
            part = random.choice(['帽', '手套', '布鞋', '布衣', '之劍'])
            self.player.set_items.append(f'孔斯{part}')
        else:
            print('副本挑戰失敗。')

    def next_map(self):
        print('成功走出沙漠，進入下一張地圖，難度提升！')
        self.map_steps = 0
        self.difficulty += 1
        self.map_goal += 5

if __name__ == '__main__':
    game = Game()
    game.start()
