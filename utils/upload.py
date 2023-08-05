import os
import uuid
from typing import Any


def upload_thumbnail_to(instance: Any, filename: str) -> str:
    """
    Upload and store the thumbnail image.

    Parameters:
        instance (Any): The model instance.
        filename (str): The original filename.

    Returns:
        str: The path to store the thumbnail image.
    """
    filename, ext = os.path.splitext(filename)

    return os.path.join(
        "thumbnail_images",
        f"thumbnail_{uuid.uuid4()}_{filename}{ext}"
    )


def upload_avatar_to(instance: Any, filename: str) -> str:
    """
    Upload and store the avatar image.

    Parameters:
        instance (Any): The model instance.
        filename (str): The original filename.

    Returns:
        str: The path to store the avatar image.
    """
    filename, ext = os.path.splitext(filename)

    return os.path.join(
        "avatar_images",
        f"avatar_{uuid.uuid4()}_{filename}{ext}"
    )