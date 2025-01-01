function searchRepositories() {
    const searchInput = document.getElementById("search-input");
    const query = searchInput.value.trim();
    const hasWebsite = document.getElementById("has-website").checked;
    const committedThisYear = document.getElementById("committed-this-year").checked;
    const hasLicense = document.getElementById("has-license").checked;

    if (!query) {
        alert("Please enter a keyword.");
        return;
    }

    document.getElementById("loader").style.display = "inline-block";
    document.getElementById("repo-list").innerHTML = '';

    //GPT4.0 metrics needed
    const apiUrl = `https://api.repose.com/search/repositories?q=${query}&per_page=30`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("loader").style.display = "none";

            if (data.items && data.items.length > 0) {
                const repoList = document.getElementById("repo-list");
                data.items.forEach(item => {
                    const lastCommitDate = new Date(item.pushed_at);
                    const currentYear = new Date().getFullYear();
                    const lastCommitThisYear = committedThisYear ? lastCommitDate.getFullYear() === currentYear : true;

                    if (
                        (!hasWebsite || item.homepage) &&
                            lastCommitThisYear &&
                            (!hasLicense || item.license)
                        ) {
                        const li = document.createElement("li");
                        li.className = "repo-item";
                        li.onclick = () => showRepoDetails(item);

                        const repoLink = document.createElement("a");
                        repoLink.href = item.html_url;
                        repoLink.target = "_blank";
                        repoLink.textContent = item.full_name;

                        li.appendChild(repoLink);
                        repoList.appendChild(li);
                    }
                });
            } else {
                    alert("Not found");
                }
            })
            .catch(error => {
                document.getElementById("loader").style.display = "none";
                alert("Error loading data from GitHub.");
                console.error(error);
            });
}

function showRepoDetails(repo) {
    document.getElementById("repo-name").textContent = repo.full_name;
    document.getElementById("repo-description").textContent = repo.description || "No description";
    document.getElementById("repo-stars").textContent = repo.stargazers_count;
    document.getElementById("repo-forks").textContent = repo.forks_count;
    document.getElementById("repo-issues").textContent = repo.open_issues_count;

    fetch(repo.languages_url)
        .then(response => response.json())
        .then(languages => {
            const languageList = Object.keys(languages).join(", ");
            document.getElementById("repo-languages").textContent = languageList || "Not specified";
        })
        .catch(error => {
            document.getElementById("repo-languages").textContent = "Error loading languages";
            console.error(error);
        });

        fetch(repo.commits_url.replace("{/sha}", ""))
            .then(response => response.json())
            .then(commits => {
                const lastCommit = commits[0] ? commits[0].commit.committer.date : "Not found";
                document.getElementById("repo-last-commit").textContent = lastCommit;
        })
        .catch(error => {
            document.getElementById("repo-last-commit").textContent = "Error loading commits";
            console.error(error);
        });

        if (repo.license) {
            document.getElementById("repo-license").textContent = repo.license.name;
        } else {
            document.getElementById("repo-license").textContent = "Not specified";
        }

        const createdAt = new Date(repo.created_at).toLocaleString();
        document.getElementById("repo-created-at").textContent = createdAt;

        const website = repo.homepage || "None";
        document.getElementById("repo-website").textContent = website;

        document.getElementById("repo-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("repo-modal").style.display = "none";
}
