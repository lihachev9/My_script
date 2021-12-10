from threading import Timer

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import visibility_of_element_located
from selenium.common.exceptions import WebDriverException, NoSuchWindowException


chrome_options = Options()
chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
s = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=s, options=chrome_options)
wait = WebDriverWait(driver, 10)


def full_screen():
    try:
        full = driver.find_elements(By.CLASS_NAME, "vjs-fullscreen-control")
        play = driver.find_elements(By.CLASS_NAME, "vjs-play-control")
        for element in full:
            if (element.get_attribute('title') != 'Не на весь экран' and
                play[0].get_attribute('title') != 'Пуск'
            ):
                ActionChains(driver).move_to_element(wait.until(visibility_of_element_located((By.ID, "my-player_html5_api")))).perform()
                wait.until(visibility_of_element_located((By.CLASS_NAME, "vjs-fullscreen-control"))).click()
        return True
    except (WebDriverException, NoSuchWindowException):
        driver.quit()
        return False


def set_interval(func, time_sec):
    if func():
        Timer(time_sec, set_interval, [func, time_sec]).start()
        

set_interval(full_screen, 0.3)

