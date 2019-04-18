/* eslint-disable no-undef */
import { Settings } from 'sketch';

const kUUIDKey = 'google.analytics.uuid';
let uuid = Settings.globalSettingForKey(kUUIDKey);
if (!uuid) {
  uuid = NSUUID.UUID().UUIDString();
  Settings.setGlobalSettingForKey(uuid, kUUIDKey);
}

const jsonToQueryString = (json) => {
  return Object.keys(json)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
    })
    .join('&');
};

const track = (hitType, props) => {
  if (!Settings.globalSettingForKey('analyticsEnabled')) {
    // the user didn't enable sharing analytics
    return;
  }
  const TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
  const payload = {
    v: 1,
    tid: TRACKING_ID,
    cid: uuid,
    t: hitType,
  };

  if (props) {
    Object.keys(props).forEach((key) => {
      payload[key] = props[key];
    });
  }

  const url = NSURL.URLWithString(`https://www.google-analytics.com/collect?${jsonToQueryString(payload)}`);

  if (url) {
    NSURLSession.sharedSession()
      .dataTaskWithURL(url)
      .resume();
  }
};

const trackAppStart = () => {
  track('event', {
    ec: 'application',
    ea: 'start',
  });
};

export { track, trackAppStart };
