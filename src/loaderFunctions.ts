
export function onProgress(xhr: any) {

    if (xhr.lengthComputable) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log('model ' + Math.round(percentComplete) + '% downloaded');

    }

}

export function onError() { console.log("Error while loading") }