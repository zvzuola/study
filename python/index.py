from prettytable import PrettyTable
from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()
purchase_base = 10
ratio = 2
count = 0


def init_purchase_table():
    global count
    count += 1
    x = PrettyTable(['投入', '投入总额', '获利', '净利润'])
    cost = 0
    for i in range(0, 10):
        purchase = purchase_base * 2 ** i
        cost += purchase
        bonus = purchase * ratio
        x.add_row([purchase, cost, bonus, bonus-cost])
    print(x)
    if(count == 3):
        sched.shutdown()


if __name__ == '__main__':
    sched.add_job(init_purchase_table, 'interval', seconds=3, id='sched_job')
    sched.start()
    print('stop')
