import { getInput, setOutput, setFailed } from '@actions/core';
import { major, minor, patch, prerelease, valid } from "semver";

try {
    const version = getInput('version', { required: true });

    if (!valid(version)) {
        throw new Error(`${version} is not a valid semver string.`);
    }

    const parts = {
        major: major(version).toString(),
        minor: minor(version),
        patch: patch(version),
        prerelease: prerelease(version).join("."),
    }

    const versions = {
        major: parts.major,
        minor: `${parts.major}.${parts.minor}`,
        patch: `${parts.major}.${parts.minor}.${parts.patch}`,
        prerelease: `${parts.major}.${parts.minor}.${parts.patch}-${parts.prerelease}`,
    }
    console.log(versions);
    setOutput('major', versions.major);
    setOutput('minor', versions.minor);
    setOutput('patch', versions.patch);
    setOutput('prerelease', versions.prerelease);
} catch (error) {
    setFailed(error.message);
}