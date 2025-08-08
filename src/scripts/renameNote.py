#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
@file renameNOte.py
@description Rename Notes with this script.
"""

import sys
import os

def rename_note(old_path, new_name):
    try:
        if not os.path.exists(old_path):
            print(f"Error: The file {old_path} does not exist.")
            return False
        directory = os.path.dirname(old_path)
        if not new_name.endswith('.md'):
            new_name += '.md'
        new_path = os.path.join(directory, new_name)
        if os.path.exists(new_path):
            print(f"Error: A file named {new_name} already exists.")
            return False
        os.rename(old_path, new_path)
        print(f"Successfully renamed {old_path} to {new_path}")
        return True
    except Exception as e:
        print(f"An error occurred: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python renameNote.py <old_path> <new_name>")
        sys.exit(1)
    old_file_path = sys.argv[1]
    new_file_name = sys.argv[2]
    if rename_note(old_file_path, new_file_name):
        sys.exit(0)
    else:
        sys.exit(1)
