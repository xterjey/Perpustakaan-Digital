<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Validator::extend('imageurl', function ($attribute, $value, $parameters, $validator) {
            $allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
            foreach ($allowedExtensions as $extension) {
                if (strpos($value, $extension) !== false) {
                    return true;
                }
            }
            return false;
        });

    }

}
