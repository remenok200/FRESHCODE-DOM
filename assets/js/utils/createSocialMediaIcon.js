function createSocialMediaIcon(user, elem) {
  const currentUser = [];
  currentUser.push(user.contacts);

  for (let i = 0; i < user.contacts.length; i++) {
    const url = new URL(user.contacts[i]);
    if (SUPPORTED_SOCIAL_NETWORKS.entries(url.hostname)) {
      const currentSocialNetworkIcon = createElement("img", {
        classNames: ["socialMediaIcon"],
        attributes: {
          src: SUPPORTED_SOCIAL_NETWORKS.get(url.hostname).src,
          alt: SUPPORTED_SOCIAL_NETWORKS.get(url.hostname).alt,
        },
      });
      const currentSocialNetwork = createElement(
        "a",
        {
          classNames: ["socialMediaIconWrapper"],
          attributes: { href: url.href },
        },
        currentSocialNetworkIcon
      );
      elem.append(currentSocialNetwork);
    }
  }
}
