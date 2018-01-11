public static OkHttpClient.Builder createClient(@NonNull Context context) {
    SharedPreferenceCookieManager cookieManager = ((WikipediaApp) context.getApplicationContext()).getCookieManager();
    // TODO: consider using okhttp3.CookieJar implementation instead of JavaNetCookieJar wrapper
    CookieJar cookieJar = new JavaNetCookieJar(cookieManager);
    HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
    loggingInterceptor.setLevel(Prefs.getRetrofitLogLevel());
    // TODO: switch to using a single instance of OkHttpClient throughout the app.
    return new OkHttpClient.Builder().cookieJar(cookieJar).cache(HTTP_CACHE).addInterceptor(loggingInterceptor);
}