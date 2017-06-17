load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_sys.js');
load('api_adc.js');
load('api_grove.js');

GPIO.set_button_handler(0, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  let topic = Cfg.get('mqtt.user') + '/feeds/rain';
  //let message = JSON.stringify(Sys.free_ram());
  let message = JSON.stringify(ADC.read(32));
  let ok = MQTT.pub(topic, message, 1);
  print('Published:', ok ? 'yes' : 'no', 'topic:', topic, 'message:', message);
}, null);
