const inputEl = document.querySelector<HTMLInputElement>("#username");
const buttonEl = document.querySelector<HTMLButtonElement>("#search");
const profileEl = document.querySelector<HTMLDivElement>("#profile");

type GitHubUser = {
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
};

function isGitHubUser(data: unknown): data is GitHubUser {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const user = data as Record<string, unknown>;

  return (
    (typeof user.name === "string" || user.name === null) &&
    (typeof user.bio === "string" || user.bio === null) &&
    typeof user.followers === "number" &&
    typeof user.following === "number" &&
    typeof user.public_repos === "number"
  );
}

buttonEl?.addEventListener("click", async () => {
  const username = inputEl?.value;

  if (profileEl) {
    profileEl.textContent = "Loading...";
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      if (profileEl) {
        profileEl.textContent =
          response.status === 404 ? "User not found" : "API error";
      }
      return;
    }

    const data: unknown = await response.json();
    if (!isGitHubUser(data)) {
      throw new Error("Invalid API response");
    }

    if (profileEl) {
      profileEl.replaceChildren();

      const h2 = document.createElement("h2");
      h2.textContent = data.name ?? "No name";
      profileEl.appendChild(h2);

      const bioP = document.createElement("p");
      bioP.textContent = `Bio: ${data.bio ?? "No bio"}`;
      profileEl.appendChild(bioP);

      const followersP = document.createElement("p");
      followersP.textContent = `Followers: ${data.followers}`;
      profileEl.appendChild(followersP);

      const followingP = document.createElement("p");
      followingP.textContent = `Following: ${data.following}`;
      profileEl.appendChild(followingP);

      const reposP = document.createElement("p");
      reposP.textContent = `Public Repositories: ${data.public_repos}`;
      profileEl.appendChild(reposP);
    }
  } catch (error) {
    if (profileEl) {
      profileEl.textContent = "Network error";
    }
    console.error(error);
  }
});
