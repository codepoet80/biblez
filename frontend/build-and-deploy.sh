#!/bin/bash

#TODO: Figure out how to build back-end

#tidy up
command="rm /tmp/*.ipk 2>null"

#build
palm-package biblez.application biblez.package biblez.service -o /tmp

# Find what was just made
unset -v ipk
for file in "/tmp"/*.ipk; do
    [[ $file -nt $ipk ]] && ipk=$file
done
if [ -z "${ipk:-}" ]; then 
    echo "build: cannot continue, palm-package did not produce a deployable ipk"
    exit
fi

palm-install $ipk

ipkfile=$(basename "$ipk")
ipkname="$(echo $ipkfile | cut -d'_' -f1)"

palm-launch -f $ipkname
palm-log -f $ipkname