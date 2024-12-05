import requests
from bs4 import BeautifulSoup
import time


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
    'Referer': 'http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&fm=detail&lm=-1&st=-1&sf=2&fmq=&pv=&ic=0&nc=1&z=&se=&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E9%AB%98%E6%B8%85%E6%91%84%E5%BD%B1&oq=%E9%AB%98%E6%B8%85%E6%91%84%E5%BD%B1&rsp=-1',
    'Cookie': 'MNGAUTOSRV=MNGAUTOSRV3; Path=/; JSESSIONID=C08DEEE27DAC3811D1B2B9D137EBEC17; tfstk=fEHmBpV3CjPXN-1uqQyX_BF7RwO8liw_5VBTWRUwazz575-_Dd0ivc-fDc8jSA4rUr3YHoEZZ2mnDrExIb6iAcMvcRKbhmw_QeLppAmjcRNHe4wSI8yzjlvOQrWqzNtWMeLppLnodc-BJqFfqafufzr4bRrwq_rLzt7q7rPPzkqLQRyZ7zzzAofN3SPNULz7bRzZ7Rl0Ata4UJDykL_DuGmSwYq0aBnzzpojeoV08mkcQOSUmS4E0zYCv1f8acNiCG6gsmlI5kuVuF4sE0kqT28RMrl3jDhi-pW_VjumU5DJfpibnr2r3XjNQ020o5k0GZYu8xird8PJLHmrFqnjEcIwQu3LzmM4Ip-Qn-z4EuM9PtziafkYGR_2SPMo4xlG4t1PTAgRCu-tU11_guZuJFI5ieART4-Bq3f3LSr7mZKkq11_guZuJ3xlTIN4Voad.',
}


def get_html(id,url, headers):

    html_content = requests.get(url, headers=headers)
    soup = BeautifulSoup(html_content.content,"html.parser")  # or 'lxml'
    isTurnOn = soup.find('input', id='srcNextDayRefundSt')
    theResult = isTurnOn.findParent().text.replace("\r", "").replace("\n", "").replace(" ", "").strip()
    print(id + '--' + theResult )


if __name__ == '__main__':
    my_list = [
        '0002210F7023141',
        '0002210F7023228',
        '0002210F7023288',
        '0002310F7314154',
        '0002340F7314160',
        '0002210F7314171',
        '0002220F7296503',
        '0002220F7296519'
    ]
    for id in my_list:
        url = 'https://8.fuioupay.com/mchntModMng.fuiou?action=goToAlterPage&applyMchntCd=' + id + '&applyType=TH&applyFcInsCd=08K0048439'
        page = get_html(id, url, headers)
        time.sleep(1.5)
