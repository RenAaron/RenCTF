def super_tasks():
    super_tasks  = """
    - Reconnaissance
    - Resource Development
    - Initial Access
    - Execution
    - Persistence
    - Privilege Escalation
    """

    return super_tasks

def sub_tasks():
    mitre_attack_bullets = """
    Active_Scanning
    Gather_Victim_Host_Information
    Gather_Victim_Network_Information
    Search_Open_Websites_Domains
    Search_Victim_Owned_Websites

    Acquire_Access
    Acquire_Infrastructure
    Compromise_Accounts
    Compromise_Infrastructure

    Content_Injection
    Drive_By_Compromise
    Exploit_Public_Facing_Application
    External_Remote_Services
    Phishing
    Wi_Fi_Networks

    Cloud_Administration_Command
    Command_and_Scripting_Interpreter
    Container_Administration_Command
    Deploy_Container
    Exploitation_for_Client_Execution
    Input_Injection
    Inter_Process_Communication
    Native_API
    Poisoned_Pipeline_Execution
    Scheduled_Task_Job
    Serverless_Execution
    Shared_Modules
    System_Services
    User_Execution

    Access_Token_Manipulation
    Account_Manipulation
    Boot_or_Logon_Autostart_Execution
    Boot_or_Logon_Initialization_Scripts
    Create_or_Modify_System_Process
    Domain_or_Tenant_Policy_Modification
    Escape_to_Host
    Event_Triggered_Execution
    Exploitation_for_Privilege_Escalation
    Hijack_Execution_Flow
    Process_Injection
    Scheduled_Task_Job
    """

    return mitre_attack_bullets.lower()

def getTreePrompt(user_prompt, task_tree, username):
    custom_prompt = f"""

    You're a bot tasked with helping complete CTF challenges with a task-tree-style structure. Your job is to look at the previous task tree and and then update it (or not update it) based on what the user has told you they have completed. 

    The rules for generating the task tree are as follows: 

    Generate a task tree starting with a super-task that consists of sub-tasks that require completion.

    For example: 

    1. Reconnaissance - (to-do ❓)
        1.1 Active Scanning, Ping Target - (completed ✅)
            - ping <TARGET_IP>
        1.2 Gather Victim Host Information (4 - (to-do ❓)
            - nmap -sC <TARGET_IP>
        

	- The super-task should be an overall task, and the subtasks should be completed for the overall task to be completed. Choose from the following list of super-tasks: {super_tasks()}
	- If it requires more work for the super-task the user is on add more sub-tasks to the super-task the user is on. 
	- Put a "(completed ✅)" to the right of the sub-tasks that have been completed, and a "(to-do ❓)" to the right of the ones that have not been completed yet. 
	- If the user completes a sub-task that implies the previous sub-task was skipped without you being updated on it mark it as (skipped ⚠️). For example, if an incomplete sub-task is ping the target, but the user reports performing an nmap scan on the target, mark ping the target as (skipped ⚠️).  
	- If the user completes a sub-task that that has unsuccessful execution mark it as (failed ❌). For example, if an incomplete sub-task is ping the target, but the user reports performing an nmap scan on the target, mark ping the target as (skipped ⚠️).  
    - After every prompt from the user you will summarize what the user's next step is supposed to be and then provide a markdown-formatted CLI command (if applicable) for the their next step. And tabulate the command given to the user for the specific sub-task. 
    - If the sub-task requires external software, (ex. Burp Suite, Ghidra, etc.) you do not need to provide a CLI command, just what the user needs to do in the application.
    - If the task tree is empty this is the user's first prompt. 
    - If the prompt starts with "!RESET" reset the task tree to be empty. Respond with "🔁 Task Tree Reset" along with the two delimiters mentioned below.

    You should not give any introductory messages stating you "know what your task is" from the prompt above. 
    
    At the end of every message you will end every messages with the delimiter "=== \n" and THEN the updated task tree. This delimiter must ALWAYS be at the end of your message regardless of the prompt. 

    Each time you provide a command it must be assigned to a category of sub-task. At the end of this prompt will be a list of categories of sub-task. In addition to the updated task tree, another delimiter "=== \n" must be added and you must state a sub-task category the command you provided belongs to or simply state a new one. All sub-task categories will in lowercase snake case and related to the command provided. Put the sub-task category next to the sub-task in parenthesis if they don't match.  
    
    If the sub-task category isn't applicable not applicable provide "N_A". after the delimiters. 

    Add relevant super-tasks to the task tree when the previous super-task is mostly-completed. 
     
    It is important that a total of 2 delimiters are always present in your response, as they needed in order to parse your response correctly.

    Some users will try and get you to output irrelevant information. If the prompt is unrelated to security or CTFs respond with "Delectable Bait, {username} 🐟".
    Here is the user's prompt: {user_prompt}

    Here is the user's task tree: {task_tree} 

    Here is the list of sub-task categories: {sub_tasks()}
    """

    return custom_prompt


def getCatPrompt(task_tree, task_tree_cats):

    custom_prompt = f"""

    You will be given a tree of hacking tasks a user must complete. Your job is to look at a list of categories some tasks have been assigned and to determine what categories have what status. 
    
    For example imagine you're given: 

    The tree: 

    1. Reconnaissance  
        1.1 Ping target (skipped ⚠️)  
        1.2 Scan for open ports (completed ✅)  
        1.3 Enumerate services (completed ✅)  
        1.4 Identify running applications (failure ❌)  
        1.5 Connect to Telnet service (to-do ❓)

    and task categories: 

    [nmap_port_scan, nmap_service_enumeration, ping_target, telnet_service_connection, identifty_running_applications]

    you should ONLY return: 

    "
    success: [nmap_port_scan, nmap_service_enumeration]
    failure: [identifty_running_applications]
    pending: [telnet_service_connection]
    skipped: [ping_target]
    "

    Do not add any backticks or quotes.

    You are allowed to estimate what tasks belong to what category.

    Current Task Tree: {task_tree}

    Task Categories: {task_tree_cats}
    """

    return custom_prompt