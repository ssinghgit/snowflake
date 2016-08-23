package com.snowflake;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactActivity;
//import com.facebook.react.ReactInstanceManager;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;



import java.util.Arrays;
import java.util.List;

// Add this line:
import com.oblador.vectoricons.VectorIconsPackage;
// Add this line:
import com.burnweb.rnsimplealertdialog.RNSimpleAlertDialogPackage;  
//Add this line
import com.airbnb.android.react.maps.MapsPackage;
import org.pgsqlite.SQLitePluginPackage;
import com.oblador.keychain.KeychainPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MyBLK";
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }


      @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
                                         new MainReactPackage(),
            new VectorIconsPackage(),            
                                               
                                         //Added two lines
                                         new RNSimpleAlertDialogPackage(),                                       
                                         new MapsPackage(),
                                         new SQLitePluginPackage(),
                                         new KeychainPackage()

                                         );
    }
}
