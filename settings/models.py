from django.db import models
from django.utils.translation import gettext_lazy as _

from .choices import IconChoices


class Icon(models.Model):
    """
    Represents an icon for social links.

    Attributes:
        name (str): Readable English name of the icon.
        icon (str): Actual react-icons name.
    """
    name = models.CharField(_("readable english name"), max_length=255, unique=True, blank=False, null=True)
    icon = models.CharField(_("actual react-icons name"), max_length=255, unique=True, blank=False, null=True)

    class Meta:
        verbose_name = _("Icon")
        verbose_name_plural = _("Icons")

    def __str__(self) -> str:
        return self.name


class SocialLink(models.Model):
    """
    Represents a social link for a user.

    Attributes:
        owner (User): The user associated with the social link.
        icon (str): The icon representing the social link.
        aliase (str): The icon aliase name.
        url (str): The URL of the social link.
        is_added (bool): Icon added status.
        is_visible (bool): Social icon visibility status.
    """
    owner = models.ForeignKey("user.User", on_delete=models.CASCADE, null=True, related_name="social_links")
    icon = models.CharField(_("icon"), max_length=100, choices=IconChoices.choices, blank=False, null=True)
    aliase = models.CharField(_("icon aliase name"), max_length=255, blank=True, null=True)
    url = models.URLField(_("url"), blank=False, null=True)
    is_added = models.BooleanField(_("icon added status"), default=True)
    is_visible = models.BooleanField(_("social icon visibility status"), default=True)

    def __str__(self) -> str:
        return f"{self.icon}: {self.url}"

    def save(self, *args, **kwargs):
        """
        Override the save method to automatically set the aliase based on the selected icon.

        Parameters:
            *args: Additional arguments.
            **kwargs: Additional keyword arguments.
        """
        alias_map = {
            "Amazon": "PiAmazonLogoLight",
            "Andriod Play Store": "PiGooglePlayLogoLight",
            "Apple Play Store": "GrAppleAppStore",
            "Apple Music": "PiMusicNotesLight",
            "Apple Podcast": "PiApplePodcastsLogoLight",
            "Bandcamp": "LiaBandcamp",
            "Clubhouse": "PiHandWavingLight", 
            "Discord": "PiDiscordLogoLight",
            "Email": "PiEnvelopeLight",
            "Etsy": "FaEtsy",
            "Facebook": "PiFacebookLogoLight", 
            "Instagram": "PiInstagramLogoLight",
            "Linkedin": "FiLinkedin",
            "Patreon": "PiPatreonLogoLight",
            "Payment": "PiCurrencyCircleDollarLight",
            "Pinterest": "PiPinterestLogoLight",
            "Signal": "BsSignal",
            "Snapchat": "PiSnapchatLogoLight",
            "Soundcloud": "PiSoundcloudLogoLight",
            "Spotify": "PiSpotifyLogoLight",
            "Substack": "SiSubstack",
            "Telegram": "PiTelegramLogoLight",
            "Tiktok": "PiTiktokLogoLight",
            "Twitch": "PiTwitchLogoLight",
            "Twitter": "PiTwitterLogoLight", 
            "WhatsApp": "PiWhatsappLogoLight",
            "Youtube": "PiYoutubeLogoLight", 
            "Github": "PiGithubLogoLight",
        }
        self.aliase = alias_map.get(self.icon, None)
        super().save(*args, **kwargs)
        
    class Meta:
        verbose_name = _("Social Icon")
        verbose_name_plural = _("Social Icons")


class SeoMetaData(models.Model):
    """
    Represents SEO metadata for a user.

    Attributes:
        owner (User): The user associated with the SEO metadata.
        title (str): The title of the SEO metadata.
        description (str): The description of the SEO metadata.
    """
    owner = models.OneToOneField("user.User", on_delete=models.CASCADE, null=True, related_name="seo_meta_data")
    title = models.CharField(_("title"), max_length=60, blank=True, null=True)
    description = models.TextField(_("description"), max_length=165, blank=True, null=True)

    class Meta:
        verbose_name = _("Seo Meta Data")
        verbose_name_plural = _("Seo Meta Data")

    def __str__(self) -> str:
        return self.title or self.description or "--empty--"