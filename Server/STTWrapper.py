# script_a.py
import subprocess

process = subprocess.Popen(
    # ['python', '-u', 'test.py', 'hello', 'world'],
    ['python', '-u', '../CyberCopilot\stt-reasoning\stt-based_reasoning\main.py', '--model_id', '1'],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
    bufsize=1
)

for line in process.stdout:
    print(line, end='')

process.wait()
