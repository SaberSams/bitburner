import { NS } from '@ns'
import { deepScan, IServers } from './lib/deepScan'

const flags = [
  ["script", ""],
  ["threads", 1]
]

export function autocomplete(data, args) : unknown {
  return [...data.scripts];
}

/** 
 * @param {NS} ns 
 * @param {string} script
*/
export function run_anywhere(ns: NS, script: string, threads: number, args: Array<string | number | boolean>) {
  const script_cost = ns.scriptCost(script);
  const servers = deepScan(ns, ns.getHostname(), 100)

  ns.exec(script, host, )
}


export async function main(ns : NS) : Promise<void> {
  
}