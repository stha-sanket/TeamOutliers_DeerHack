import logging
import sys
from datetime import datetime

def setup_logger():
    # Create logger
    logger = logging.getLogger('workflow')
    logger.setLevel(logging.INFO)

    # Create console handler with formatting
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)

    # Create formatter
    formatter = logging.Formatter(
        '\x1b[36m%(asctime)s\x1b[0m [\x1b[33m%(levelname)s\x1b[0m] \x1b[32m%(name)s\x1b[0m: %(message)s',
        datefmt='%H:%M:%S'
    )
    console_handler.setFormatter(formatter)

    # Add handler to logger if it doesn't already have one
    if not logger.handlers:
        logger.addHandler(console_handler)

    return logger

# Create and configure the logger
logger = setup_logger()
