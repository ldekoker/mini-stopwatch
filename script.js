// Vars
// - elapsedTime (number?) (00:00:00)
// - isCounting (boolean)
// - startTime
// - ticker
let elapsedTime = 0;
let isCounting = false;
let startTime;
let ticker;

// Objects from HTML
// Screen - displays current elapsedTime
// Button(Start.Stop)
// Button(Reset)
const Screen = document.getElementById("screen");
const Toggle = document.getElementById("toggle");
const Reset = document.getElementById("reset");

// On toggle click()
// If not isCounting: start_timer()
// else: stop_timer()
Toggle.addEventListener("click", function(){
    if (!isCounting){
        start_timer();
    }
    else {
        stop_timer();
    }
});

// On reset click()
// reset_timer()
Reset.addEventListener("click", ()=>(reset_timer()));

// start_timer()
// update text
// startTime is current time
// if ticker is Interval: clearInterval(ticker))
// Start timer tick (ticker = setInterval(timer_tick, 10))
function start_timer(){
    isCounting = true;
    Toggle.innerHTML = "Stop";
    startTime = Date.now();
    ticker = setInterval(timer_tick, 10);
}

// stop_timer()
// update text
// Stop timer tick (clearInterval(ticker))
// elapsedTime = calculate_time_status()
function stop_timer(){
    isCounting = false;
    Toggle.innerHTML = "Start";
    clearInterval(ticker);
    elapsedTime = calculate_time_status();
}

// timer_tick()
// Screen = calculate_time_status()
function timer_tick(){
    screen_display(convert_to_time(calculate_time_status()));
}

function screen_display(x){
    Screen.innerHTML = x;
}

// calculate_time_status()
// return elapsedTime + (curTime - startTime)
function calculate_time_status(){
    return elapsedTime + (Date.now() - startTime);
}

// reset_timer()
// if isCounting: return None
// Reset elapsedTime to 0
// Print to Screen element
function reset_timer(){
    if (isCounting){return 0;}
    elapsedTime = 0;
    screen_display(convert_to_time(0));
}

function convert_to_time(time){
    let ms = Math.floor(time % 1000 / 10); // 46 (keep right 3 digits, lose right 1))
    ms < 10 ? ms = ms.toString().padStart(2, '0') : ms = ms.toString();
    let s = Math.floor(time % 100000 / 1000); // 23 (keep right 5 digits, lose right 3)
    s < 10 ? s = s.toString().padStart(2, '0') : s = s.toString();
    let m = Math.floor(time % 10000000 / 100000); // 01 (keep right 7 digits, lose right 5)
    m < 10 ? m = m.toString().padStart(2, '0') : m = m.toString();

    return m + ":" + s + ":" + ms;

    // Time: 01:23:45 = 123456
}