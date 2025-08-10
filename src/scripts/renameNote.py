#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# DEPENDENCIES
import sys
import os
import json
import traceback

# FUNCTION
def rename_note(old_path, new_name):
    try:
        if not os.path.exists(old_path):
            return {
                "success": False,
                "error": f"The file {old_path} does not exist."
            }
        directory = os.path.dirname(old_path)
        if not new_name.endswith('.md'):
            new_name += '.md'
        new_path = os.path.join(directory, new_name)
        if os.path.exists(new_path):
            return {
                "success": False,
                "error": f"A file named {new_name} already exists."
            }
        os.rename(old_path, new_path)
        return {
            "success": True,
            "old": old_path,
            "new": new_path
        }
    except Exception as e:
        tb = traceback.format_exc()
        return {
            "success": False,
            "error": str(e),
            "traceback": tb
        }

# CALL
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(json.dumps({
            "success": False,
            "error": "Usage: python renameNote.py <old_path> <new_name>"
        }))
        sys.exit(1)
    old_file_path = sys.argv[1]
    new_file_name = sys.argv[2]
    result = rename_note(old_file_path, new_file_name)
    print(json.dumps(result))
    if result["success"]:
        sys.exit(0)
    else:
        print(result["error"], file=sys.stderr)
        sys.exit(1)
