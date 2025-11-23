# 完整批量翻譯腳本
$filePath = "c:\Users\Lila\Desktop\code\egypt_adventures\main.js"
$content = Get-Content -Path $filePath -Raw -Encoding UTF8

Write-Host "開始批量翻譯..." -ForegroundColor Green

# 戰鬥系統
$content = $content -replace "showMessage\(`你閃避了敵人的自動普攻！\(戰鬥幸運 \`\$\{this\.player\.luck_combat\}\)`\);", "showMessage(`"`${t('dodgedAttack')} `${this.player.luck_combat})`");"
$content = $content -replace "showMessage\(`敵人自動普攻，造成 \`\$\{dmg\} 傷害（護盾吸收 \`\$\{consumedShield\}），玩家 HP -\`\$\{mitigated\}。`\);", "showMessage(`"`${t('enemyAutoAttack')} `${dmg} `${t('damageText')}（`${t('shieldAbsorbed')} `${consumedShield}），`${t('playerHp')} -`${mitigated}。`");"

# 罹難旅人
$content = $content -replace "showMessage\(`⚔️ 你在遺體旁找到了 \`\$\{this\.formatItem\(newItem\)\}！`\);", "showMessage(`"`${t('foundEquipmentOnBody')} `${this.formatItem(newItem)}！`");"
$content = $content -replace "showMessage\(`💰 你找到了 \`\$\{gold\} 金幣和 \`\$\{newItem\.name\}！`\);", "showMessage(`"`${t('foundGoldAndItem')} `${gold} `${t('goldCoinsText')} `${newItem.name}！`");"
$content = $content -replace "showMessage\(`💰 你在遺體旁找到了 \`\$\{gold\} 金幣。`\);", "showMessage(`"`${t('foundGoldOnly')} `${gold} `${t('goldCoinsEnd')}`");"
$content = $content -replace "showMessage\(`（小心離開時受到輕傷 -\`\$\{damage\} HP）`\);", "showMessage(`"`${t('minorInjury')} -`${damage} `${t('hpLoss')}`");"

# 神殿事件
$content = $content -replace "showMessage\(`✨ 神殿的祝福降臨！最大HP \+\`\$\{blessing\.value\}`\);", "showMessage(`"`${t('templeBlessingMaxHp')} +`${blessing.value}`");"
$content = $content -replace "showMessage\(`✨ 神殿的祝福降臨！戰鬥幸運 \+\`\$\{blessing\.value\}`\);", "showMessage(`"`${t('templeBlessingCombatLuck')} +`${blessing.value}`");"
$content = $content -replace "showMessage\(`✨ 神殿的祝福降臨！金幣幸運 \+\`\$\{blessing\.value\}`\);", "showMessage(`"`${t('templeBlessingGoldLuck')} +`${blessing.value}`");"
$content = $content -replace "showMessage\(`💎 你在神殿中找到了古老的寶藏！獲得 \`\$\{gold\} 金幣。`\);", "showMessage(`"`${t('templeTreasure')} `${gold} `${t('goldCoinsEnd')}`");"
$content = $content -replace "showMessage\(`受到詛咒傷害 -\`\$\{damage\} HP`\);", "showMessage(`"`${t('curseDamage')} -`${damage} `${t('hp')}`");"
$content = $content -replace "showMessage\(`陷阱造成 \`\$\{damage\} 點傷害！`\);", "showMessage(`"`${t('trapDamage')} `${damage} `${t('pointDamage')}`");"

# 商隊休息
$content = $content -replace "showMessage\(`💰 商隊隊長贈送你一些金幣（\+\`\$\{gift\.value\}）以答謝你的到來。`\);", "showMessage(`"`${t('caravanGiftGold')}`${gift.value}`${t('thankYou')}`");"

# 遊牧民
$content = $content -replace "showMessage\(`🎁 遊牧民贈送你一件 \`\$\{newItem\.name\}（已加入背包）`\);", "showMessage(`"`${t('nomadGiftItem')} `${newItem.name}`${t('addedToInventoryMsg')}`");"
$content = $content -replace "showMessage\(`獲得經驗值和 \`\$\{gold\} 金幣。`\);", "showMessage(`"`${t('gainedExpAndGold')} `${gold} `${t('goldCoinsEnd')}`");"

# 流沙/毒蠍
$content = $content -replace "showMessage\(`消耗體力 -\`\$\{staminaLoss\}`\);", "showMessage(`"`${t('staminaConsumed')} -`${staminaLoss}`");"
$content = $content -replace "showMessage\(`受到毒素傷害 -\`\$\{damage\} HP`\);", "showMessage(`"`${t('poisonDamage')} -`${damage} `${t('hp')}`");"
$content = $content -replace "showMessage\(`HP -\`\$\{damage\}，體力 -\`\$\{staminaLoss\}`\);", "showMessage(`"`${t('hpStaminaLoss')} -`${damage}，`${t('staminaRestore')} -`${staminaLoss}`");"
$content = $content -replace "showMessage\(`獲得 \`\$\{gold\} 金幣！`\);", "showMessage(`"`${t('gainedGold')} `${gold} `${t('goldCoinsEnd')}`");"

# 古代遺跡
$content = $content -replace "showMessage\(`⚱️ 你在遺跡中找到了古代神器 \`\$\{this\.formatItem\(newItem\)\}！`\);", "showMessage(`"`${t('foundArtifact')} `${this.formatItem(newItem)}！`");"
$content = $content -replace "showMessage\(`受到 \`\$\{damage\} 點傷害！`\);", "showMessage(`"`${t('receivedDamage')} `${damage} `${t('pointDamage')}`");"

# 驛站
$content = $content -replace "showMessage\(`💰 賣出 \`\$\{item\.name\}，獲得 \`\$\{price\} 金幣。`\);", "showMessage(`"`${t('soldItem')} `${item.name}，`${t('obtainedGold')} `${price} `${t('goldCoinsEnd')}`");"

# 神祇
$content = $content -replace "showMessage\(`獲得祝福：金幣 \+\`\$\{finalG\}（含金幣幸運加成 x\`\$\{this\.player\.luck_gold\}）。`\);", "showMessage(`"`${t('godBlessingGold')} +`${finalG}`${t('goldLuckBonus2')} x`${this.player.luck_gold}）。`");"
$content = $content -replace "showMessage\(`金幣幸運 -1（剩餘 \`\$\{this\.player\.luck_gold\}）。`\);", "showMessage(`"`${t('goldLuckDecreased')} -1（`${t('remaining')} `${this.player.luck_gold}）。`");"

# 金字塔
$content = $content -replace "showMessage\(`金字塔副本完成！探索了 \`\$\{this\.pyramidSteps\}/\`\$\{this\.pyramidMaxSteps\} 步。`\);", "showMessage(`"`${t('pyramidComplete')} `${this.pyramidSteps}/`${this.pyramidMaxSteps} `${t('stepCount')}`");"

# 插槽戰鬥 - 主要結果
$content = $content -replace "showMessage\(`主要符號：\`\$\{primary\}，匹配數：\`\$\{matchCount\}\`\$\{bonusMsg\}，連續 x\`\$\{effectiveCombo\}（乘數 x\`\$\{comboMultiplier\.toFixed\(2\)\}）`\);", "showMessage(`"`${t('slotResult')}`${primary}`${t('matchCount')}`${matchCount}`${bonusMsg}`${t('consecutive')} x`${effectiveCombo}`${t('multiplier')} x`${comboMultiplier.toFixed(2)}）`");"

# 插槽戰鬥 - 攻擊
$content = $content -replace "showMessage\(`你發動普通攻擊 x\`\$\{matchCount\}\`\$\{isCrit\? '（暴擊）':''\}，對敵人造成 \`\$\{finalDmg\} 傷害。`\);", "showMessage(`"`${t('normalAttack')} x`${matchCount}`${isCrit? t('critText'):''}`${t('causingDamage')} `${finalDmg} `${t('damageText')}。`");"

# 插槽戰鬥 - 技能
$content = $content -replace "showMessage\(`你使用技能 x\`\$\{matchCount\}\`\$\{isCrit2\? '（暴擊）':''\}，對敵人造成 \`\$\{finalDmg2\} 傷害，消耗體力 \`\$\{staminaCost\}。`\);", "showMessage(`"`${t('skillAttack')} x`${matchCount}`${isCrit2? t('critText'):''}`${t('causingDamage')} `${finalDmg2} `${t('damageText')}，`${t('consumeStamina')} `${staminaCost}。`");"

# 插槽戰鬥 - 防禦
$content = $content -replace "showMessage\(`你獲得防禦 x\`\$\{matchCount\}（連擊 x\`\$\{effectiveCombo\}），護盾 \+\`\$\{shieldGain\}。`\);", "showMessage(`"`${t('defenseGain')} x`${matchCount}`${t('combo')} x`${effectiveCombo}）`${t('shieldGain')} +`${shieldGain}。`");"

# 插槽戰鬥 - 回復
$content = $content -replace "showMessage\(`使用紅色水瓶 x\`\$\{matchCount\}（連擊 x\`\$\{effectiveCombo\}），回復 HP \`\$\{hpGain\}、體力 \`\$\{staminaGain\}。`\);", "showMessage(`"`${t('potionUse')} x`${matchCount}`${t('combo')} x`${effectiveCombo}）`${t('restoreHp')} `${hpGain}、`${t('restoreStamina')} `${staminaGain}。`");"

# 插槽戰鬥 - 幸運
$content = $content -replace "showMessage\(`獲得戰鬥幸運 \+\`\$\{luckGain\}，提高暴擊與閃避機率。`\);", "showMessage(`"`${t('luckGain')} +`${luckGain}`${t('improveRate')}`");"

# 插槽戰鬥 - 閃避符號攻擊
$content = $content -replace "showMessage\(`你閃避了敵人符號攻擊（戰鬥幸運 \`\$\{this\.player\.luck_combat\}）！`\);", "showMessage(`"`${t('dodgedSymbolAttack')}`${this.player.luck_combat}）！`");"

# 插槽戰鬥 - 敵人攻擊詳細
$content = $content -replace "showMessage\(`敵人攻擊 x\`\$\{matchCount\}，原始傷害 \`\$\{rawDmg\}，護盾吸收 \`\$\{consumedShield\}，實際受損 \`\$\{mitigated\}。`\);", "showMessage(`"`${t('enemyAttack')} x`${matchCount}，`${t('damageText')} `${rawDmg}，`${t('shieldAbsorbed')} `${consumedShield}，`${t('playerHp')} -`${mitigated}。`");"

# 其他戰鬥訊息
$content = $content -replace "showMessage\(`獲得金幣 \`\$\{got\}（💰 x\`\$\{matchCount\}，連擊 x\`\$\{effectiveCombo\}）。`\);", "showMessage(`"`${t('gainedGold')} `${got}（💰 x`${matchCount}，`${t('combo')} x`${effectiveCombo}）。`");"
$content = $content -replace "showMessage\(`目前連續主符號：\`\$\{this\.consecutivePrimarySymbol\} x\`\$\{this\.consecutivePrimaryCount\}`\);", "showMessage(`"`${t('consecutive')}`${t('slotResult')}`${this.consecutivePrimarySymbol} x`${this.consecutivePrimaryCount}`");"

# 保存文件
$content | Set-Content -Path $filePath -Encoding UTF8 -NoNewline

Write-Host "批量翻譯完成！" -ForegroundColor Green
Write-Host "已處理所有主要中文訊息的翻譯。" -ForegroundColor Cyan
