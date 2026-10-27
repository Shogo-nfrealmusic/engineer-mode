const inputEl = document.querySelector<HTMLInputElement>("#username");
const button = document.querySelector<HTMLButtonElement>("#search");
const profile = document.querySelector<HTMLDivElement>("#profile");

type GithubUser = {
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
};

function isGithubUser(data: unknown): data is GithubUser {
  if (typeof data !== "object" || data == null) {
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

button?.addEventListener("click", async () => {
  const username = inputEl?.value;

  if (profile) {
    profile.textContent = "Loading...";
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      if (profile) {
        profile.textContent =
          response.status === 404 ? "User not found" : "API error";
      }
      return;
    }

    const data: unknown = await response.json();

    if (!isGithubUser(data)) {
      throw new Error("Invalid API response");
    }

    if (profile) {
      profile.replaceChildren();

      const h2 = document.createElement("h2");
      h2.textContent = data.name ?? "No name";
      profile.appendChild(h2);

      const bioP = document.createElement("p");
      bioP.textContent = `Bio: ${data.bio ?? "No bio"}`;
      profile.appendChild(bioP);

      const followersP = document.createElement("p");
      followersP.textContent = `Followers: ${data.followers}`;
      profile.appendChild(followersP);

      const followingP = document.createElement("p");
      followingP.textContent = `Following: ${data.following}`;
      profile.appendChild(followingP);

      const reposP = document.createElement("p");
      reposP.textContent = `Public Repositories: ${data.public_repos}`;
      profile.appendChild(reposP);
    }
  } catch (error) {
    if (profile) {
      profile.textContent = "Network error";
    }
    console.error(error);
  }
});
