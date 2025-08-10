#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
@file deleteNote.py
@description Delete Notes with this script.
"""

# DEPENDENCIES
import sys
import os

# FUNCTION
def delete_note(filename):
    try:
        if os.path.exists(filename):
            os.remove(filename)
            print("Deleted")
            return 0
        else:
            print("File not found")
            return 1
    except Exception as e:
        print(f"Error: {e}")
        return 2

# CALL
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No filename provided")
        sys.exit(3)
    file_to_delete = sys.argv[1]
    sys.exit(delete_note(file_to_delete))
