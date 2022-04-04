import { NS } from "@ns";
import { deepScan, IServers } from "./lib/deepScan";

const help = `
Usage: scan [--file] [--host] [--depth] [--quiet]

Runs a recursive scan on the current host or one specified with the host flag

    file:   {filename} optional file path to save the js object to, if not specified does not save
    host:   {hostname} the root host to run the scan from, default current host
    depth:  {number} how many levels deep to scan, default 99
    quiet:  mutes output 
    help:   prints this page, ignores any other arguments
`;
const flags = ([
  ["file", ""],
  ["host", ""],
  ["depth", 1],
  ["quiet", false],
  ["help", false],
])

export function autocomplete(data, args) : unknown {
  return [...data.flags, "--file", "--host", "--depth", "--quiet", "--help"];
}

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  const args = ns.flags(flags);
  
  if (args["help"]) {
    ns.tprint(help);
    return;
  }
  if(args["host"] === "") {
    args["host"] = ns.getHostname();
  }
  const servers:IServers = deepScan(ns, args["host"], args["depth"]);
  if (!args["quiet"]) {
    ns.tprint(`found ${Object.keys(servers).length} servers`);
    let output = "Network:";
    Object.keys(servers).forEach((server) => {
      output += "\n" + ".".repeat(servers[server].path.length)
      output += servers[server].hasAdminRights ? " ✓ " : " ✗ ";
      output += `${server}`
      output += `${ns.nFormat(servers[server].moneyMax, "($ 0.00 a)")}`;
    });
    ns.tprint(output);
  }
  if (args["file"]) {
    await ns.write(args["file"], JSON.stringify(servers), "w")
  }
}
