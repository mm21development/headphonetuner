    async function fetchVersion() {
        const repo = "mm21development/headphonetuner";
        try {
            const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
            if (response.ok) {
                const data = await response.json();
                document.getElementById('versionTag').innerText = data.tag_name;
            } else {
                const commitResp = await fetch(`https://api.github.com/repos/${repo}/commits/main`);
                const commitData = await commitResp.json();
                const date = new Date(commitData.commit.author.date);
                document.getElementById('versionTag').innerText = "v" + date.toISOString().split('T')[0].replace(/-/g, '.');
            }
        } catch (e) {
            document.getElementById('versionTag').innerText = "v1.0.0 (lokal)";
        }
    }

    fetchVersion();