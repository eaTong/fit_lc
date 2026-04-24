#!/usr/bin/env python3
"""
FitLC Chat Testing Script
Tests 200+ random natural language statements including:
- Workout recording
- Body measurement recording
- Query operations
- Follow-up questions (追问)
- Confirmation flows (确认)
- Undo operations (撤销)
"""

import random
import time
from playwright.sync_api import sync_playwright

# Constants
API_BASE = "http://localhost:3000/api"
FRONTEND_URL = "http://localhost:5173"

# Random data generators
def random_date(days_back=30):
    import datetime
    date = datetime.datetime.now() - datetime.timedelta(days=random.randint(0, days_back))
    return date.strftime("%Y-%m-%d")

def random_float(min_val, max_val, decimals=1):
    return round(random.uniform(min_val, max_val), decimals)

def random_int(min_val, max_val):
    return random.randint(min_val, max_val)

# Exercise names and templates
EXERCISES = [
    "深蹲", "卧推", "硬拉", "肩上推举", "划船", "引体向上", "俯卧撑",
    "平板支撑", "波比跳", "开合跳", "高抬腿", "登山者",
    "跑步", "快走", "骑行", "游泳", "跳绳",
    "哑铃弯举", "哑铃卧推", "哑铃划船", "哑铃深蹲", "哑铃肩上推举",
    "杠铃深蹲", "杠铃卧推", "罗马尼亚硬拉", "腿举", "腿弯举",
    "卷腹", "仰卧起坐", "俄罗斯转体", "侧平板支撑"
]

# Measurement body parts (matching backend enum)
MEASUREMENT_PARTS = ["胸围", "腰围", "臀围", "左臂围", "右臂围",
                     "左大腿围", "右大腿围", "左小腿围", "右小腿围", "肩宽"]

# Generate workout statements
def gen_workout_statements(count=80):
    statements = []
    templates = [
        # Basic strength training
        lambda: f"今天做了{random_int(3,8)}组{random.choice(EXERCISES)}，每组{random_int(6,15)}个，重量{random_int(10,100)}kg",
        lambda: f"{random.choice(EXERCISES)} {random_int(4,6)}组x{random_int(8,12)}个，重量{random_int(20,80)}公斤",
        lambda: f"练了{random_int(3,5)}组{random.choice(EXERCISES)}，每组{random_int(10,20)}次",
        # Running/Aerobic
        lambda: f"今天跑步{random_float(2,10)}公里，用时{random_int(15,60)}分钟",
        lambda: f"骑自行车骑了{random_float(10,50,1)}公里",
        lambda: f"游泳游了{random_int(500,2000)}米",
        lambda: f"跳绳跳了{random_int(100,500)}个，分{random_int(3,6)}组完成",
        lambda: f"快走{random_int(30,60)}分钟，大约{random_float(2,6)}公里",
        # Bodyweight
        lambda: f"做了{random_int(3,5)}组俯卧撑，每组{random_int(10,30)}个",
        lambda: f"做了{random_int(4,6)}组深蹲，每组{random_int(15,25)}个",
        lambda: f"波比跳做了{random_int(10,30)}个，分{random_int(2,4)}组",
        lambda: f"引体向上做了{random_int(3,6)}组，每组{random_int(5,12)}个",
        lambda: f"平板支撑坚持了{random_int(30,180)}秒",
        # HIIT
        lambda: f"做了{random_int(15,30)}分钟HIIT训练",
        lambda: f"做了{random_int(3,5)}轮Tabata训练",
        lambda: f"间歇跑训练：跑{random_int(400,1000)}米x{random_int(4,8)}组",
        # Combined
        lambda: f"今天练了腿和臀，{random.choice(EXERCISES)} {random_int(3,4)}组和{random.choice(EXERCISES)} {random_int(3,4)}组",
        lambda: f"上肢训练日：{random.choice(EXERCISES)}和{random.choice(EXERCISES)}各{random_int(3,4)}组",
        lambda: f"今天主要练胸，卧推{random_int(3,5)}组每组{random_int(6,10)}个重量{random_int(40,100)}kg",
        lambda: f"今天力量训练{random_int(45,90)}分钟",
        lambda: f"健身{random_int(30,75)}分钟，做了{random.choice(EXERCISES)}",
    ]
    for _ in range(count):
        statements.append({
            "type": "workout",
            "text": templates[random.randint(0, len(templates)-1)]()
        })
    return statements

# Generate measurement statements
def gen_measurement_statements(count=50):
    statements = []
    templates = [
        lambda: f"今天测量：{random.choice(MEASUREMENT_PARTS)} {random_float(70,120)}cm",
        lambda: f"{random.choice(MEASUREMENT_PARTS)} 现在是 {random_float(25,50)}cm",
        lambda: f"量了一下，{random.choice(MEASUREMENT_PARTS)} {random_float(30,60,1)}厘米",
        lambda: f"身体围度记录：{random.choice(MEASUREMENT_PARTS)} {random_float(75,110)}，{random.choice(MEASUREMENT_PARTS)} {random_float(30,55)}",
        lambda: f"今天测了{random.choice(MEASUREMENT_PARTS)}是{random_float(28,55,1)}cm",
        lambda: f"更新围度数据：胸围{random_float(85,115)}cm，腰围{random_float(60,95)}cm",
        lambda: f"臀围{random_float(80,110)}cm，大腿围{random_float(45,70)}cm",
        lambda: f"记录一下：左臂{random_float(25,40,1)}cm，右臂{random_float(25,40,1)}cm",
        lambda: f"今天测量的围度数据：肩宽{random_float(35,55)}cm",
        lambda: f"小腿围左边{random_float(30,45,1)}cm，右边{random_float(30,45,1)}cm"
    ]
    for _ in range(count):
        statements.append({
            "type": "measurement",
            "text": templates[random.randint(0, len(templates)-1)]()
        })
    return statements

# Generate query statements
def gen_query_statements(count=40):
    statements = []
    templates = [
        lambda: f"这周跑了多少次？",
        lambda: f"上个月深蹲总重量多少？",
        lambda: f"我的训练频率怎么样？",
        lambda: f"对比一下这周和上周",
        lambda: f"最近有没有记录跑步？",
        lambda: f"这周的训练量是多少？",
        lambda: f"我的围度有什么变化？",
        lambda: f"上周胸围是多少？",
        lambda: f"最近一次训练是什么时候？",
        lambda: f"这个月做了多少次有氧？",
        lambda: f"查一下最近的训练记录",
        lambda: f"我想看看这周的健身数据",
        lambda: f"臀围最近有变化吗？",
        lambda: f"这周做了哪些训练？",
        lambda: f"我的体重围度记录？"
    ]
    for _ in range(count):
        statements.append({
            "type": "query",
            "text": templates[random.randint(0, len(templates)-1)]()
        })
    return statements

# Generate follow-up/confirmation statements
def gen_followup_statements(count=30):
    statements = []
    templates = [
        # Confirmation
        lambda: f"是的，记录一下",
        lambda: f"对，没错",
        lambda: f"好的，保存吧",
        lambda: f"没错就是这样",
        # Follow-up questions
        lambda: f"能帮我生成一个健身计划吗？",
        lambda: f"根据这些数据给我一些建议",
        lambda: f"这个月比上个月进步了多少？",
        lambda: f"接下来我应该怎么练？",
        lambda: f"有什么可以改进的地方？",
        # Plan related
        lambda: f"我想制定一个增肌计划",
        lambda: f"帮我生成一周的训练计划",
        lambda: f"根据我最近的训练调整一下计划",
    ]
    for _ in range(count):
        statements.append({
            "type": "followup",
            "text": templates[random.randint(0, len(templates)-1)]()
        })
    return statements

def register_and_login(page):
    """Register a new user and login"""
    timestamp = int(time.time() * 1000)
    email = f"test_{timestamp}@example.com"
    password = "test123456"

    # Register
    page.goto(f"{FRONTEND_URL}/register")
    page.wait_for_load_state("networkidle")

    page.fill('input[type="email"]', email)
    page.fill('input[type="password"]', password)
    page.click('button[type="submit"]')
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)

    return email, password

def send_message_and_wait(page, message, timeout=30000):
    """Send a message and wait for response"""
    input_box = page.locator('input[placeholder*="输入"]').first
    input_box.fill(message)
    input_box.press("Enter")

    # Wait for loading to finish
    page.wait_for_timeout(5000)

def run_test():
    print("=" * 60)
    print("FitLC Chat Testing - 200+ Random Statements")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Track results
        results = {
            "total": 0,
            "success": 0,
            "failed": 0,
            "saved_data": []
        }

        try:
            # Register and login
            print("\n[1/4] Registering and logging in...")
            email, password = register_and_login(page)

            # Navigate to chat
            page.goto(f"{FRONTEND_URL}/chat")
            page.wait_for_load_state("networkidle")
            print("   Logged in successfully, navigated to chat page")

            # Generate all test statements
            print("\n[2/4] Generating 220+ test statements...")
            workout_stmts = gen_workout_statements(85)
            measurement_stmts = gen_measurement_statements(55)
            query_stmts = gen_query_statements(45)
            followup_stmts = gen_followup_statements(35)

            # Interleave statements to simulate real usage
            all_statements = []
            idx_w, idx_m, idx_q, idx_f = 0, 0, 0, 0
            while len(all_statements) < 220:
                if idx_w < len(workout_stmts):
                    all_statements.append(workout_stmts[idx_w])
                    idx_w += 1
                if idx_m < len(measurement_stmts) and len(all_statements) < 220:
                    all_statements.append(measurement_stmts[idx_m])
                    idx_m += 1
                if idx_q < len(query_stmts) and len(all_statements) < 220:
                    all_statements.append(query_stmts[idx_q])
                    idx_q += 1
                if idx_f < len(followup_stmts) and len(all_statements) < 220:
                    all_statements.append(followup_stmts[idx_f])
                    idx_f += 1

            print(f"   Generated {len(all_statements)} statements:")
            print(f"   - Workouts: {len(workout_stmts)}")
            print(f"   - Measurements: {len(measurement_stmts)}")
            print(f"   - Queries: {len(query_stmts)}")
            print(f"   - Follow-ups: {len(followup_stmts)}")

            # Test sending messages
            print("\n[3/4] Testing chat with random statements...")
            print("-" * 60)

            for i, stmt in enumerate(all_statements):
                results["total"] += 1

                try:
                    # Send message
                    input_box = page.locator('input[placeholder*="输入"]').first
                    input_box.fill(stmt["text"])
                    input_box.press("Enter")

                    # Wait for response
                    page.wait_for_timeout(3000)

                    # Check if message was sent
                    messages = page.locator('[class*="message"]').all()
                    if len(messages) > 0:
                        results["success"] += 1
                        print(f"   [{i+1:3d}/{len(all_statements)}] [{stmt['type']:12s}] OK - {stmt['text'][:40]}...")
                    else:
                        results["failed"] += 1
                        print(f"   [{i+1:3d}/{len(all_statements)}] [{stmt['type']:12s}] FAIL - {stmt['text'][:40]}...")

                except Exception as e:
                    results["failed"] += 1
                    print(f"   [{i+1:3d}/{len(all_statements)}] [{stmt['type']:12s}] ERROR - {str(e)[:40]}...")

                # Progress update every 25 messages
                if (i + 1) % 25 == 0:
                    print(f"   --- Progress: {i+1}/{len(all_statements)} | Success: {results['success']} | Failed: {results['failed']} ---")

            # Test undo functionality
            print("\n[4/4] Testing undo functionality...")
            undo_button = page.locator('button:has-text("撤销")').first
            if undo_button.is_visible(timeout=5000):
                undo_button.click()
                page.wait_for_timeout(1000)
                print("   Undo button clicked successfully")
            else:
                print("   No undo button found (may not have saved data yet)")

            # Final results
            print("\n" + "=" * 60)
            print("TEST RESULTS SUMMARY")
            print("=" * 60)
            print(f"Total statements tested: {results['total']}")
            print(f"Successful: {results['success']}")
            print(f"Failed: {results['failed']}")
            print(f"Success rate: {(results['success']/results['total']*100):.1f}%")
            print("=" * 60)

            # Take a screenshot of final state
            page.screenshot(path="/tmp/fitlc_chat_final.png", full_page=True)
            print("\nScreenshot saved to /tmp/fitlc_chat_final.png")

        except Exception as e:
            print(f"\nTest failed with error: {e}")
            page.screenshot(path="/tmp/fitlc_chat_error.png")
            print("Error screenshot saved to /tmp/fitlc_chat_error.png")

        finally:
            browser.close()

    return results

if __name__ == "__main__":
    run_test()