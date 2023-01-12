<?php
/**
 * @file
 * Wraps your content with a div with bootstrap column size classes.
 */

namespace Drupal\shortcode_idmc\Plugin\Shortcode;

use Drupal\Core\Language\Language;
use Drupal\shortcode\Plugin\ShortcodeBase;

/**
 * Provides a shortcode for drawing idmc charts.
 *
 * @Shortcode(
 *   id = "idmcchart",
 *   title = @Translation("IDMC charts"),
 *   description = @Translation("Builds a charts with custom params + IDMC database")
 * )
 */
class DrawIDMCChartShortcode extends ShortcodeBase
{

    
  public function getUrlSurffixFromType($type)
    {
        $surffix = '';

        switch ($type) {
            case 'country_conflict_violence_displacement':
                $surffix = '/api/displacement_data';
                break;

            case 'country_latest_grid_stock':
                $surffix = '/api/strata_data';
                // $surffix = '/api/conflict_data';
                break;

            case 'country_events_timeline':
                $surffix = '/api/disaster_events';
                break;

            case 'country_new_displacement':
                $surffix = '/api/displacement_data';
                break;

            case 'database_map':
                $surffix = 'none';
                break;
            
            case 'database_map_prospective':
                $surffix = 'none';
                break;
            case 'database_map_aad':
                $surffix = 'none';
                break;

            case 'database_total_annual_new_displacements':
                $surffix = 'none';
                break;

            case 'database_disaster_scale':
                $surffix = 'none';
                break;

            case 'database_disaster_hazard':
                $surffix = 'none';
                break;

            case 'database_displaced_vs_refugees':
                $surffix = 'none';
                break;

            case 'confidence_assessment_table':
                $surffix = '/api/confidence_assessment';
                break;
            case 'myf_2019':
                $surffix = 'none';
                break;
            case 'myf_2020':
                $surffix = 'none';
                break;
            case 'arid':
                $surffix = 'none';
                break;

            default:
                # code...
                break;
        }

        return $surffix;
    }

    public function getThemeFromType($type)
    {
        $theme = '';

        switch ($type) {
            case 'country_conflict_violence_displacement':
                $theme = 'country_conflict_violence_displacement';
                break;

            case 'country_latest_grid_stock':
                $theme = 'country_latest_grid_stock';
                break;

            case 'country_events_timeline':
                $theme = 'country_events_timeline';
                break;

            case 'country_new_displacement':
                $theme = 'country_new_displacement';
                break;

            case 'database_map':
                $theme = 'database_map';
                break;
            
            case 'database_map_prospective':
                $theme = 'database_map_prospective';
                break;
            case 'database_map_aad':
                $theme = 'database_map_aad';
                break;

            case 'database_total_annual_new_displacements':
                $theme = 'database_total_annual_new_displacements';
                break;

            case 'database_disaster_scale':
                $theme = 'database_disaster_scale';
                break;

            case 'database_disaster_hazard':
                $theme = 'database_disaster_hazard';
                break;

            case 'database_displaced_vs_refugees':
                $theme = 'database_displaced_vs_refugees';
                break;

            case 'confidence_assessment_table':
                $theme = 'confidence_assessment_table';
                break;
            case 'myf_2019':
                $theme = 'myf_2019';
                break;
            case 'myf_2020':
                $theme = 'myf_2020';
                break;
            case 'arid':
                $theme = 'arid';
                break;

            default:
                # code...
                break;
        }

        return $theme;
    }

    

    public function process(array $attributes, $text, $langcode = Language::LANGCODE_NOT_SPECIFIED)
    {
        // return json_encode($attributes);

        // get attributes from shortcode input text
		
        $attributes = $this->getAttributes([
            'year'      => '',
            'iso3'      => '',
            'type'      => '',
          'subtype'     =>''
        ],
            $attributes
        );
		
		

        // validate type
        if (empty($attributes['type'])) {
            return '<div>Type is empty!</div>';
        }
        $type = $attributes['type'];

        // some variables never change
        $baseUrl = 'https://api.idmcdb.org';
        //$baseUrl = 'https://beta.api.idmcdb.org';
        // $ci      = 'MF005BCOMOCT02';
        $ci      = 'IDMCWSHSOLO009';

        // some params
        $urlSurffix = $this->getUrlSurffixFromType($type);
        $theme      = $this->getThemeFromType($type);
        if (empty($urlSurffix) || empty($theme)) {
            return '<div>Can not get surffix/theme from type!</div>';
        }

        // build url to fetch data
        $url = "{$baseUrl}{$urlSurffix}?ci={$ci}";
        if (!empty($attributes['iso3'])) {
            $url .= '&iso3=' . $attributes['iso3'] .'&year=2000&year=2020&range=true';
        }
        if (!empty($attributes['year'])) {
            $url .= '&year=' . $attributes['year'];
        }


        // Special cases: conflict + disaster charts => check data is empty or not
        try {
            if ($this->checkDataIsEmpty($type, $url)) {
                return '<div>data_chart_got_is_empty</div>';
            }
        } catch (\Exception $e) {
            return '<div>data_chart_got_is_empty</div>';
        }


        $chartDivId = rand(1, 999999) . "_{$type}";
        $output = [];

        if ($type === 'confidence_assessment_table') {
            // get json data
            $tableData = $this->getConfidenceAssessmentData($url);
            $output = [
                '#theme'      => $theme,
                '#tabledata'   => $tableData,
            ];
        } else if ($type === 'myf_2019') {
          $modulePath = drupal_get_path('module', 'shortcode_idmc');
            $output = [
                '#theme'      => $theme,
              '#subtype'  => $attributes['subtype'],
              '#modulepath' => $modulePath,
              
            ];
        }else if ($type === 'myf_2020') {
          $modulePath = drupal_get_path('module', 'shortcode_idmc');
            $output = [
                '#theme'      => $theme,
              '#subtype'  => $attributes['subtype'],
              '#modulepath' => $modulePath,
              
            ];
        }else if ($type === 'arid') {
          $modulePath = drupal_get_path('module', 'shortcode_idmc');
            $output = [
                '#theme'      => $theme,
              '#modulepath' => $modulePath,
              
            ];
        } else {
            $modulePath = drupal_get_path('module', 'shortcode_idmc');
          // old url
          //  var url_conflict =  'https://api.idmcdb.org/api/displacement_data?ci=MF005BCOMOCT02&amp;iso3=IRQ'
          // var url_newdis =     'https://api.idmcdb.org/api/displacement_data?ci=MF005BCOMOCT02&amp;iso3=IRQ'
          // var url_etl =        'https://api.idmcdb.org/api/disaster_events?ci=MF005BCOMOCT02&amp;iso3=IRQ'
          // beta url
          // var url_conflict =  'https://api.idmcdb.org/api/displacement_data?ci=MF005BCOMOCT02&amp;iso3=IRQ'

            $output = [
                '#theme'      => $theme,
                '#url'        => $url,
                '#chartdivid' => $chartDivId,
                '#year'       => $attributes['year'],
                '#attributes' => '',
                '#modulepath' => $modulePath,
            ];
			
			
			
        }
		
		$renderer = \Drupal::service('renderer');
		return $renderer->render($output);
        
      //  return $this->render($output);

        // drupal_add_js(drupal_get_path('module', 'shortcode_idmc') . '/amcharts/amcharts.js');
        // drupal_add_js(drupal_get_path('module', 'shortcode_idmc') . '/amcharts/serial.js');
        // drupal_add_js(drupal_get_path('module', 'shortcode_idmc') . '/amcharts/themes/light.js');
        // drupal_add_js(drupal_get_path('module', 'shortcode_idmc') . '/amcharts/plugins/export/export.min.js');
        // drupal_add_js(drupal_get_path('module', 'shortcode_idmc') . '/amcharts/plugins/dataloader/dataloader.min.js');
        // drupal_add_css(drupal_get_path('module', 'shortcode_idmc') . '/amcharts/plugins/export/export.css');
    }

    public function getConfidenceAssessmentData($url) {
        // set curl params
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_FAILONERROR, true); 
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true); 
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); 
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false); 
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); 
        // exec curl
        $contentStr = curl_exec($curl);
        curl_close($curl);

        $contentArr = (array) json_decode($contentStr);
        // foreach ($contentArr['results'] as $key => $type) {
        //     $contentArr['results'][$key] = (array) $type;
        // }
        
        return $contentArr['results'];

    }

    public function checkDataIsEmpty($type, $url){
        if (!in_array($type, array(
            'country_conflict_violence_displacement',
            'country_new_displacement',
            'country_events_timeline',
            'confidence_assessment_table',
        ))) {
            return false;
        }

        // set curl params
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_FAILONERROR, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        // execute curl
        $contentStr = curl_exec($curl);
        curl_close($curl);

        $contentArr = (array)json_decode($contentStr);
        
        if ($type === 'confidence_assessment_table' && !empty($contentArr['results'])) {
            return false;
        }

        if (empty($contentArr['total']) || empty($contentArr['results'])) {
            return true;
        }

        $dataIsEmpty = true;
        foreach ($contentArr["results"] as $row) {
            $row = (array) $row;

            if ($type == 'country_conflict_violence_displacement'
                && (!empty($row['conflict_stock_displacement']) || !empty($row['conflict_new_displacements']))
            ){
                $dataIsEmpty = false;
                break;
            }

            if ($type == 'country_new_displacement' && (!empty($row['disaster_new_displacements']))){
                $dataIsEmpty = false;
                break;
            }

            if ($type == 'country_events_timeline' && (!empty($row['new_displacements']))){
                $dataIsEmpty = false;
                break;
            }
        }

        return $dataIsEmpty;
    }

    /**
     * {@inheritdoc}
     */
    public function tips($long = false)
    {
        $output   = array();
        $output[] = '<p><strong>' . $this->t('[idmcchart year="2016" iso3="AFG" type="country_conflict_violence_displacement"/]') . '</strong> ';

        return implode(' ', $output);
    }
}
