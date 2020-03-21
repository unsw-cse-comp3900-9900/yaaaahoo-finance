async function loadModel() {
    const model = await tf.loadLayersModel('model.json');
    // console.log(model.inputShape);
    const vals = model.predict(tf.randomNormal([1, 63,1]));
    const prediction = await vals.data();
    console.log(prediction);
    // const vals = model.predict([[1.64222894]
    //     [1.73222211]
    //     [1.75446199]
    //     [1.75963027]
    //     [1.72653383]
    //     [1.62516309]
    //     [1.6479177 ]
    //     [1.69395211]
    //     [1.7679084 ]
    //     [1.72704753]
    //     [1.70842751]
    //     [1.78031968]
    //     [1.68101934]
    //     [1.67222751]
    //     [1.68205406]
    //     [1.65050707]
    //     [1.70584285]
    //     [1.75083735]
    //     [1.79428137]
    //     [1.79531609]
    //     [1.81496606]
    //     [1.80151958]
    //     [1.72549911]
    //     [1.70842751]
    //     [1.68308926]
    //     [1.69756992]
    //     [1.71101688]
    //     [1.72394391]
    //     [1.74876742]
    //     [1.77359613]
    //     [1.7637691 ]
    //     [1.7979002 ]
    //     [1.7637691 ]
    //     [1.61792563]
    //     [1.44984207]
    //     [1.49328684]
    //     [1.49225184]
    //     [1.49225184]
    //     [1.49225184]
    //     [1.49225184]
    //     [1.47106288]
    //     [1.35666237]
    //     [1.42936464]
    //     [1.31603405]
    //     [1.28609755]
    //     [1.11930861]
    //     [1.25883383]
    //     [1.31496494]
    //     [1.3310023 ]
    //     [1.32726015]
    //     [1.25883383]
    //     [1.1636786 ]
    //     [1.18131996]
    //     [1.09257869]
    //     [1.10220161]
    //     [1.11128915]
    //     [1.21018652]
    //     [1.34650517]
    //     [1.26150741]
    //     [1.26150741]
    //     [1.23050147]
    //     [1.1700931 ]
    //     [1.27326807]]);
    // const dates = [];
    // for(day = 1; day < 64; day++) {
    //     dates.push(day);
    // }
    // const series = ['Price', 'Date'];
    // const data = {values: [prediction, dates], series}
    // const data = {values: [prediction]};
    // const surface = { name: 'Line chart', tab: 'Charts' };
    // tfvis.render.linechart(surface, data);
    tfvis.render.histogram({name:'Histogram', tab:'Charts'}, prediction);
    const data = { values: [vals] };

    const surface = { name: 'Line chart', tab: 'Charts' };
    tfvis.render.linechart(surface, data);
    // return vals;
}
// const model = tf.loadLayersModel('model.json');
console.log("BURH");
document.addEventListener('DOMContentLoaded', loadModel);