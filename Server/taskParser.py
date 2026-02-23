import re
from collections import defaultdict
from typing import Dict

def update_task_status_counts(
    text: str,
    task_dict: Dict[str, Dict[str, int]],
    *,
    known_statuses=None,
) -> Dict[str, Dict[str, int]]:
    """
    Parse a block like:
        taken: [task_e]
        pending: [task_a, task_b, task_c]
        skipped: [task_d]

    and update task_dict so each task accumulates counts by status.

    Example output shape:
        {
          "task_a": {"pending": 1},
          "task_b": {"pending": 1},
          "task_e": {"taken": 1},
          ...
        }
    """
    if known_statuses is not None:
        known_statuses = set(known_statuses)

    # Match lines like: status: [a, b, c]
    line_re = re.compile(r"^\s*([A-Za-z_][\w-]*)\s*:\s*\[(.*?)\]\s*$")

    for raw_line in text.strip().splitlines():
        line = raw_line.strip()
        if not line:
            continue

        m = line_re.match(line)
        if not m:
            # Ignore lines that don't match the expected pattern
            continue

        status, inside = m.group(1), m.group(2)
        if known_statuses is not None and status not in known_statuses:
            continue

        # Split tasks by comma, strip whitespace, drop empties
        tasks = [t.strip() for t in inside.split(",") if t.strip()]
        for task in tasks:
            if task not in task_dict:
                task_dict[task] = {}
            task_dict[task][status] = task_dict[task].get(status, 0) + 1

    return task_dict


# --- example usage ---
# s = """
# taken: [task_e]
# pending: [task_a, task_b, task_c]
# skipped: [task_d]
# """

s = """
taken: []
pending: [ nmap_port_scan, nmap_service_enumeration, ping_target ]
skipped: []
"""

# task_dict = {"task_a": {"taken": 1, "pending": 2, "skipped": 3}}

# task_dict = {}

# update_task_status_counts(s, task_dict)

# print(task_dict)
# {
#   'task_a': {'taken': 1, 'pending': 3, 'skipped': 3},
#   'task_e': {'taken': 1},
#   'task_b': {'pending': 1},
#   'task_c': {'pending': 1},
#   'task_d': {'skipped': 1}
# }
